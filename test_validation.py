"""
Test script for the filename validation functionality.
"""
from app import is_valid_name as is_valid_basic
from appV2 import is_valid_name as is_valid_advanced

# Test basic naming convention
valid_basic = "20250302123456_sample.txt"
invalid_basic = "sample.txt"
invalid_format = "202503021234_sample.txt"  # Incorrect timestamp format

# Test advanced naming convention
valid_advanced = "20250302123456_docs_sample.txt"
invalid_advanced = "20250302123456_sample.txt"  # Missing directory part

print("\n--- Testing Basic Naming Convention ---")
print(f"'{valid_basic}' is valid: {is_valid_basic(valid_basic)}")
print(f"'{invalid_basic}' is valid: {is_valid_basic(invalid_basic)}")
print(f"'{invalid_format}' is valid: {is_valid_basic(invalid_format)}")

print("\n--- Testing Advanced Naming Convention ---")
print(f"'{valid_advanced}' is valid: {is_valid_advanced(valid_advanced)}")
print(f"'{invalid_advanced}' is valid: {is_valid_advanced(invalid_advanced)}")
print(f"'{invalid_basic}' is valid: {is_valid_advanced(invalid_basic)}")