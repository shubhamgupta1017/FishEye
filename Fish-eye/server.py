from flask import Flask, request, jsonify
import requests
from urllib.parse import urlparse
import re
import joblib
import numpy as np
import pandas as pd
import csv
app = Flask(__name__)

def count_slash(url):
    count = -2
    for char in url:
        if char == '/':
            count += 1
    return max(count,0)

def c_unicode(url):
    parsed_url = urlparse(url)
    url_without_encoding = parsed_url.netloc.encode('idna').decode('utf-8')
    return url_without_encoding != parsed_url.netloc


def contains_ip_address(url):
    ip_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"
    match = re.search(ip_pattern, url)
    return match is not None

def contains_at_symbol(url):
    return '@' in url


def count_dots_in_hostname(url):
    parsed_url = urlparse(url)
    hostname = parsed_url.hostname
    if hostname:
        return max(hostname.count('.')-1,0)
    else:
        return 0
    
def contains_at_symbol(url):
    return '-' in url

def check_double_slash_in_path(url):
    parsed_url = urlparse(url)
    if parsed_url.path:
        if "//" in parsed_url.path:
            return 1
    return 0

def check_https_token_in_url(url):
    parsed_url = urlparse(url)
    if parsed_url.scheme == 'https':
        return 1
    return 0

def is_shortened_url(url):
    parsed_url = urlparse(url)
    return parsed_url.netloc.lower() == 'tinyurl.com'

def check_hostname_length(url):
    if len(url) > 40:
            return 1
    return 0


def calc(url):
    try:
        features={}
        features['slash_count'] = int(count_slash(url))
        features['unicode'] = int(c_unicode(url))
        features['ip_address'] = int(contains_ip_address(url))
        features['at_symbol'] = int(contains_at_symbol(url))
        features['dot_count'] = int(count_dots_in_hostname(url))
        features['dash'] = int(contains_at_symbol(url))
        features['double_slash'] = int(check_double_slash_in_path(url))
        features['https_token'] = int(check_https_token_in_url(url))
        features['shortened_url'] = int(is_shortened_url(url))
        features['hostname_length'] = int(check_hostname_length(url))
        return features

    except Exception as e:
        print(f"Error occurred: {e}")
        return None, None
    



@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.json


    feature=calc(data['value'])
    lst=[int(j) for i,j in feature.items()]
    model_path = 'random_forest_model.pkl'
    random_forest_model = joblib.load(model_path)
    input_features = np.array(lst).reshape(1, -1)
    print(lst)
    predictions = random_forest_model.predict(input_features)
    print(predictions)


    top_websites = []
    with open('websites.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            top_websites.append(row[1])
    parsed_url = urlparse(data['value'])
    domain = parsed_url.netloc

    for website in top_websites:
        if website in domain:
            predictions=np.array([1])


    processed_data = {'result': predictions.tolist()}  
    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(debug=True)



