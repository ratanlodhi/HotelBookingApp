#!/usr/bin/env python
"""
Django Settings Test Script
A comprehensive utility to test Django setup, database connectivity, and model operations.
"""

import os
import sys
import argparse
import logging
from datetime import datetime

# Add the current directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

def setup_django():
    """Set up Django environment"""
    # Set the Django settings module (strip any trailing spaces)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stayeasyhotel.settings'.strip())
    
    try:
        import django
        django.setup()
        logger.info("✅ Django setup successful!")
        return True
    except Exception as e:
        logger.error(f"❌ Django setup failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_database_connection():
    """Test database connectivity"""
    try:
        from django.db import connection
        connection.ensure_connection()
        logger.info("✅ Database connection successful!")
        
        # Test basic database operations
        cursor = connection.cursor()
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()
        logger.info(f"📊 Database version: {db_version[0]}")
        return True
    except Exception as e:
        logger.error(f"❌ Database connection failed: {e}")
        return False

def test_model_imports():
    """Test importing all models"""
    models_to_test = ['Hotel', 'Room', 'Booking', 'User']
    results = {}
    
    for model_name in models_to_test:
        try:
            if model_name == 'User':
                from django.contrib.auth.models import User
            else:
                from api.models import __dict__ as models_dict
                User = models_dict.get(model_name)
            
            if User:
                logger.info(f"✅ {model_name} model imported successfully!")
                results[model_name] = True
            else:
                logger.warning(f"⚠️  {model_name} model not found!")
                results[model_name] = False
        except Exception as e:
            logger.error(f"❌ Failed to import {model_name}: {e}")
            results[model_name] = False
    
    return results

def test_model_operations():
    """Test basic CRUD operations on models"""
    try:
        from api.models import Hotel, Room
        from django.contrib.auth.models import User
        
        # Test Hotel model
        test_hotel = Hotel.objects.create(
            name="Test Hotel",
            description="A test hotel for validation",
            location="Test Location",
            rating=4.5,
            amenities=["WiFi", "Pool", "Gym"]
        )
        logger.info(f"✅ Hotel created: {test_hotel}")
        
        # Test retrieval
        hotels_count = Hotel.objects.count()
        logger.info(f"📊 Total hotels in database: {hotels_count}")
        
        # Clean up
        test_hotel.delete()
        logger.info("✅ Test data cleaned up successfully!")
        
        return True
    except Exception as e:
        logger.error(f"❌ Model operations test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_authentication():
    """Test authentication setup"""
    try:
        from rest_framework_simplejwt.tokens import RefreshToken
        from django.contrib.auth.models import User
        
        # Create a test user
        test_user, created = User.objects.get_or_create(
            username="test_user",
            defaults={'email': 'test@example.com', 'password': 'testpassword123'}
        )
        
        if created:
            logger.info("✅ Test user created successfully!")
        else:
            logger.info("✅ Test user already exists!")
        
        # Test JWT token generation
        refresh = RefreshToken.for_user(test_user)
        logger.info("✅ JWT token generation successful!")
        logger.info(f"📊 Access token: {str(refresh.access_token)[:50]}...")
        
        return True
    except Exception as e:
        logger.error(f"❌ Authentication test failed: {e}")
        return False

def main():
    """Main test function"""
    parser = argparse.ArgumentParser(description='Test Django settings and database connectivity')
    parser.add_argument('--all', action='store_true', help='Run all tests')
    parser.add_argument('--setup', action='store_true', help='Test Django setup only')
    parser.add_argument('--db', action='store_true', help='Test database connection only')
    parser.add_argument('--models', action='store_true', help='Test model imports only')
    parser.add_argument('--operations', action='store_true', help='Test model operations')
    parser.add_argument('--auth', action='store_true', help='Test authentication')
    
    args = parser.parse_args()
    
    # If no specific test is specified, run all
    run_all = args.all or not any([args.setup, args.db, args.models, args.operations, args.auth])
    
    logger.info("🚀 Starting Django settings test...")
    logger.info(f"📅 Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {}
    
    # Run tests based on arguments
    # Always run Django setup first if any test requires it
    needs_django = any([run_all, args.db, args.models, args.operations, args.auth])
    
    if run_all or args.setup or needs_django:
        results['django_setup'] = setup_django()
    
    if run_all or args.db:
        if results.get('django_setup', False):
            results['database'] = test_database_connection()
        else:
            logger.warning("⚠️  Skipping database test - Django setup failed")
            results['database'] = False
    
    if run_all or args.models:
        if results.get('django_setup', False):
            results['models'] = all(test_model_imports().values())
        else:
            logger.warning("⚠️  Skipping model test - Django setup failed")
            results['models'] = False
    
    if run_all or args.operations:
        if results.get('django_setup', False) and results.get('database', False):
            results['operations'] = test_model_operations()
        else:
            logger.warning("⚠️  Skipping operations test - Django or database setup failed")
            results['operations'] = False
    
    if run_all or args.auth:
        if results.get('django_setup', False):
            results['auth'] = test_authentication()
        else:
            logger.warning("⚠️  Skipping auth test - Django setup failed")
            results['auth'] = False
    
    # Summary
    logger.info("\n" + "="*50)
    logger.info("📋 TEST SUMMARY")
    logger.info("="*50)
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        logger.info(f"{test_name.replace('_', ' ').title():<20} {status}")
    
    logger.info("="*50)
    logger.info(f"Total Tests: {total_tests} | Passed: {passed_tests} | Failed: {total_tests - passed_tests}")
    
    if all(results.values()):
        logger.info("🎉 All tests passed successfully!")
        return 0
    else:
        logger.error("💥 Some tests failed!")
        return 1

if __name__ == '__main__':
    sys.exit(main())
