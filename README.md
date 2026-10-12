# 🏥 HealthSync — Multi-Speciality Hospital & Digital Healthcare Platform

> **Production-Grade Microservices Healthcare Platform**  
> Complete with patient self-service OPD booking, verified clinical faculty discovery, authenticated Electronic Health Records (EHR) dossier, asynchronous notification pipelines, and a unified API Gateway.

---

## 📑 Table of Contents
- [Overview & Architecture](#-overview--architecture)
- [Microservices Ecosystem](#-microservices-ecosystem)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Quick Start Guide](#-quick-start-guide)
- [Localhost Access URLs](#-localhost-access-urls)
- [Pre-configured Demo Credentials](#-pre-configured-demo-credentials)
- [API Documentation](#-api-documentation)
- [Production Architecture & Security](#-production-architecture--security)

---

## 🏛️ Overview & Architecture

HealthSync is designed around a decoupled, domain-driven **Microservices Architecture**. The entire platform routes client traffic through a centralized **API Gateway**, isolating individual microservices and enabling high scalability, fault tolerance, and independent deployability.

```
                           ┌───────────────────────────────┐
                           │    React Frontend (SPA)       │
                           │     http://localhost:3000     │
                           └──────────────┬────────────────┘
                                          │  REST (JWT Bearer)
                                          ▼
                           ┌───────────────────────────────┐
                           │      API Gateway (Port 7010)   │
                           │   http://localhost:7010       │
                           └──────────────┬────────────────┘
                                          │
        ┌──────────────────┬──────────────┴─────┬──────────────────┐
        ▼                  ▼                    ▼                  ▼
┌──────────────┐   ┌──────────────┐     ┌──────────────┐   ┌──────────────┐
│ User Service │   │ Appointment  │     │ Notification │   │ EHR Service  │
│  (Port 7001) │   │  (Port 7002) │     │  (Port 7003) │   │  (Port 7004) │
└───────┬──────┘   └───────┬──────┘     └───────┬──────┘   └───────┬──────┘
        │                  │                    │                  │
        ▼                  ▼                    ▼                  ▼
┌──────────────┐   ┌──────────────┐     ┌──────────────┐   ┌──────────────┐
│ MongoDB:     │   │ MongoDB:     │     │ MongoDB /    │   │ MongoDB:     │
│ healthsync_  │   │ healthsync_  │     │ Nodemailer   │   │ healthsync_  │
│ users        │   │ appointments │     │ notifications│   │ ehr          │
└──────────────┘   └──────────────┘     └──────────────┘   └──────────────┘
```

---

## 🚀 Microservices Ecosystem

| Microservice | Port | Description & Responsibilities |
|---|---|---|
| **API Gateway** | `7010` | Single entry-point reverse proxy, request logging, route multiplexing, and CORS handling. |
| **User Service** | `7001` | Bcrypt password hashing (12 rounds), JWT issuance (7-day lifecycle), profile management, and doctor directory. |
| **Appointment Service** | `7002` | Outpatient (OPD) appointment booking, slot management, status state machine (Pending, Confirmed, Completed, Cancelled), and notification hooks. |
| **Notification Service** | `7003` | Asynchronous notification dispatcher supporting email alerts via Nodemailer and MongoDB audit trails. |
| **EHR Service** | `7004` | Electronic Health Records management: patient clinical vitals, diagnostic histories, verified prescriptions, drug allergy alerts, and lab results. |
| **Frontend Portal** | `3000` | Multi-speciality hospital portal crafted with React, React Router v7, Tailwind CSS, and FontAwesome. |

---

## ✨ Key Features

### 🩺 Multi-Speciality Hospital Patient Portal
- **Hero & Emergency Care Banner**: Prominent 24/7 hotline display, ambulance dispatch numbers, and campus address.
- **Centres of Excellence**: Dedicated departments for *Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, and Oncology*.
- **Doctor Directory with Instant Search**: Filter medical consultants by specialization, qualification, and fees.
- **Outpatient (OPD) Booking Engine**: Multi-step booking flow with department selection, verified doctor card selection, date picker, slot selection, and digital token issuance.
- **Patient Dashboard**: High-level overview of active tokens, total consultations, recorded blood group, and upcoming appointments.
- **My Appointments Management**: Real-time status tags, token numbers, and cancellation functionality.
- **Electronic Health Records (EHR)**: Full patient clinical history, vitals monitoring (BP, Heart Rate, SpO2, Temp), multi-medication dosage schedules, drug allergies, and lab diagnostics.
- **Role-based Authentication**: Secure JWT storage with automatic logout on token expiration and route guards.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router v7, Tailwind CSS (Design System), FontAwesome 6, Axios Interceptors
- **Backend**: Node.js, Express, `http-proxy-middleware` v3
- **Database**: MongoDB (Individual multi-database tenant separation per microservice), Mongoose ODM
- **Security**: Bcrypt.js salt hashing, JWT (JsonWebToken), CORS policy, sanitize inputs
- **Communication**: HTTP REST APIs + Asynchronous Inter-Service Events via Axios

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18 or later
- **MongoDB**: Running locally on `mongodb://localhost:27017`

### 2. Start MongoDB
```bash
# macOS (Homebrew or direct binary)
mongod --dbpath /tmp/mongodb-data --port 27017 --fork --logpath /tmp/mongodb.log
```

### 3. Seed Hospital Data (Doctors, Patients, EHR records)
```bash
cd /path/to/healthSync_project
node seed.js
```

### 4. Launch All Backend Microservices & API Gateway
```bash
node start_backend.js
```
*This command starts all 5 microservices in parallel (Ports 7010, 7001, 7002, 7003, 7004).*

### 5. Launch the React Frontend
```bash
cd healthsync-frontend
npm start
```

---

## 🌐 Localhost Access URLs

| Interface | Localhost URL |
|---|---|
| 🌐 **Hospital Web Portal (UI)** | **[http://localhost:3000](http://localhost:3000)** |
| 🔌 **API Gateway Health & Proxy** | **[http://localhost:7010/health](http://localhost:7010/health)** |
| 👤 **User Service Endpoint** | **[http://localhost:7001/health](http://localhost:7001/health)** |
| 📅 **Appointment Service Endpoint** | **[http://localhost:7002/health](http://localhost:7002/health)** |
| 📧 **Notification Service Endpoint** | **[http://localhost:7003/health](http://localhost:7003/health)** |
| 🏥 **EHR Service Endpoint** | **[http://localhost:7004/health](http://localhost:7004/health)** |

---

## 🔑 Pre-configured Demo Credentials

You can log in instantly using the **Quick Demo Accounts** buttons on the login screen or with these credentials:

### 👤 Demo Patient Account
- **Email**: `patient@healthsync.com`
- **Password**: `Password123!`
- *Has existing booked appointments and clinical EHR records ready to view.*

### 🩺 Demo Doctor Account (Cardiology)
- **Email**: `sarah.mitchell@healthsync.com`
- **Password**: `Password123!`

---

## 📖 API Documentation (Via Gateway: `http://localhost:7010`)

### Authentication & Users
- `POST /api/users/register` — Register a new patient/doctor
- `POST /api/users/login` — Sign in and receive JWT token
- `GET  /api/users/profile` — Get authenticated user's profile `[Bearer Token]`
- `PUT  /api/users/profile` — Update patient profile `[Bearer Token]`
- `GET  /api/users/doctors` — List all active medical consultants `(Public)`

### Appointments
- `POST /api/appointments` — Book a new OPD appointment `[Bearer Token]`
- `GET  /api/appointments` — Get all appointments for logged-in user `[Bearer Token]`
- `GET  /api/appointments/:id` — View appointment details `[Bearer Token]`
- `PATCH /api/appointments/:id/status` — Update status (pending/confirmed/cancelled) `[Bearer Token]`
- `DELETE /api/appointments/:id` — Cancel appointment token `[Bearer Token]`

### Electronic Health Records (EHR)
- `GET  /api/ehr/my` — Fetch logged-in patient's full EHR dossier `[Bearer Token]`
- `POST /api/ehr` — Create an EHR encounter record `[Bearer Token]`
- `GET  /api/ehr/patient/:patientId` — View patient records (Physicians/Admins) `[Bearer Token]`

---

## 🛡️ Production Readiness & Architectural Improvements Made

1. **Security & Hashing**: Eliminated plaintext credentials; implemented `bcryptjs` with salt rounds (12) and JWT token validation with standardized expiration handling.
2. **Persistent MongoDB Models**: Replaced in-memory mock arrays in `appointment-service` with complete Mongoose schema modeling and validation.
3. **Bug Resolution**: Resolved missing `EHR` model import bug in `ehr-service` routes and standardized controller structures.
4. **API Gateway Path Routing**: Configured `http-proxy-middleware` v3 with `pathFilter` and decoupled body-parsing to ensure smooth POST/PUT request streams.
5. **Modern Professional UI**: Built a responsive, multi-speciality hospital portal modeled after tertiary healthcare benchmarks (Apollo Hospitals / NHS standards).
