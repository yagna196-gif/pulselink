# PulseLink Specification

## Project Overview

PulseLink is a full-stack web application that helps patients find compatible blood donors during emergencies by matching blood requests with registered donors.

## Problem Statement

During emergencies, patients and their families often struggle to find blood donors quickly. Current methods depend on personal contacts, social media, and manual searching, which can result in dangerous delays.

## Proposed Solution

PulseLink provides a centralized platform where donors register their information and patients create blood requests. The system automatically finds compatible donors and notifies them about the request.

## User Roles

### Donor

* Register as a blood donor
* Update availability status
* View blood requests
* Accept or reject donation requests

### Patient

* Create blood requests
* Track request status
* View accepted donors

### Admin

* Manage donor records
* Manage blood requests
* Monitor system activity

## Functional Requirements

### Donor Registration

Donors must provide:

* Full Name
* Phone Number
* Address
* Blood Group
* Last Donation Date

### Donor Eligibility

A donor is eligible only if:

* They are marked as available
* Their last donation date is at least 90 days before the request

### Blood Request Creation

Patients must provide:

* Patient Name
* Phone Number
* Hospital Address
* Required Blood Group
* Emergency Notes

### Matching System

When a blood request is created:

1. Find donors with matching blood groups.
2. Verify donor availability.
3. Verify donor eligibility.
4. Notify matching donors.
5. Record donor responses.

### Request Acceptance

When a donor accepts:

* Request status becomes Accepted.
* Patient receives donor contact information.

## Non-Functional Requirements

* Responsive UI
* Secure data storage
* Fast request processing
* Scalable architecture
* Easy-to-use interface

## MVP Features

* Donor Registration
* Blood Request Creation
* Blood Group Matching
* Donor Acceptance/Rejection
* Request Tracking
* Admin Dashboard

## Future Enhancements

* SMS Notifications
* Location-Based Matching
* Hospital Integration
* Emergency Priority Requests
* Donor Reward System
* AI-Powered Donor Recommendations
