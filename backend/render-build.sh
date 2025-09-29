#!/bin/bash

# Update package lists and install build tools required for compiling packages
apt-get update && apt-get install -y build-essential gcc

# Upgrade pip, setuptools, wheel, and cython
pip install --upgrade pip setuptools wheel cython

# Install project dependencies from requirements.txt
pip install -r requirements.txt
