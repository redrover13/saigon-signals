# Saigon Signals - Google Cloud Platform Architecture

This document outlines the foundational Google Cloud architecture for the Dulce de Saigon's F&B data platform.

## 1. Architectural Diagram

The following diagram illustrates the end-to-end data flow, from ingestion to analytics.

```mermaid
graph TD
    subgraph "Data Sources (Nguồn Dữ liệu)"
        A[POS Systems - iPOS]
        B[Delivery Apps - GrabFood, ShopeeFood]
        C[Inventory Systems]
        D[Customer Feedback - Social Media, Google Maps]
    end

    subgraph "Ingestion (Thu thập)"
        E[Cloud Pub/Sub]
        F[Cloud Functions]
    end

    subgraph "Storage (Lưu trữ)"
        G[Cloud Storage - Raw Zone]
        H[BigQuery - Staging & Production]
    end

    subgraph "Processing & Transformation (Xử lý & Chuyển đổi)"
        I[Dataflow]
        J[BigQuery - SQL Transformations]
    end

    subgraph "Analytics & Serving (Phân tích & Cung cấp)"
        K[Looker Studio - Dashboards]
        L[Vertex AI - Predictions]
        M[Cloud Functions - APIs for Ops App]
    end

    subgraph "Security & Governance (An ninh & Quản trị)"
      S1[Identity and Access Management (IAM)]
      S2[VPC Service Controls]
      S3[Cloud Key Management Service (KMS)]
      S4[Data Catalog]
    end

    %% Data Flow
    A -- Real-time Sales Data --> E
    B -- Orders & Delivery Metrics --> E
    C -- Stock Levels --> F
    D -- Vietnamese NLP --> F

    E -- Raw Events --> G
    F -- Raw Data Payloads --> G

    G --> I

    I -- Cleansed & Structured Data --> H
    J -- DWH & Data Marts --> H

    H -- Curated Data --> K
    H -- ML Training Data --> L
    H -- Operational Data --> M

    %% Connections to Security
    E --- S1
    H --- S1
    K --- S1
    L --- S1
    M --- S1
    H --- S2
    G --- S2
    H --- S3
    G --- S3
    H --- S4

    classDef vietnam fill:#DA251D,stroke:#333,stroke-width:2px,color:#fff;
    class A,B,C,D vietnam;
## 2. Component Descriptions & Justifications

### Data Sources (Nguồn Dữ liệu)
- **iPOS, GrabFood, etc.**: These are the primary sources of transactional and operational data in the Vietnamese F&amp;B ecosystem. Direct integration is crucial for real-time insights.
- **Customer Feedback**: Unstructured text from social media (Facebook, Instagram) and Google Maps reviews provides rich, qualitative data. This requires a robust NLP pipeline to understand sentiment and identify trends specific to the Vietnamese language and culture.

### Ingestion (Thu thập)
- **Cloud Pub/Sub**: A scalable, serverless messaging service ideal for decoupling event producers (like POS systems) from consumers. Its push/pull mechanism handles backpressure effectively during peak hours (e.g., lunch rush). The first 10 GB of messages per month are free.
- **Cloud Functions**: For event-driven, serverless compute. Perfect for lightweight, stateless tasks like receiving webhooks from third-party APIs (delivery apps) or triggering processing jobs. The free tier includes 2 million invocations per month, which is ample for our initial scale.

### Storage (Lưu trữ)
- **Cloud Storage**: A cost-effective and durable object store. We will use it to create a "data lake" raw zone, storing all incoming data in its original format for compliance and future reprocessing. The free tier includes 5 GB-months of standard storage.
- **BigQuery**: A serverless, highly scalable data warehouse. It allows us to run fast SQL queries across petabytes of data. We'll use it for staging cleansed data and creating production-ready data marts. Its separation of storage and compute optimizes costs, and the first 1 TB of queries and 10 GB of storage are free each month.

### Processing & Transformation (Xử lý & Chuyển đổi)
- **Dataflow**: A unified stream and batch data processing service. It's ideal for ETL/ELT pipelines, automatically scaling resources based on demand. This is perfect for transforming the raw data from Cloud Storage into a structured format for BigQuery.
- **BigQuery (SQL Transformations)**: For in-database transformations, creating aggregated tables and business-specific views is highly efficient. This leverages BigQuery's powerful engine and simplifies the data pipeline.

### Analytics & Serving (Phân tích & Cung cấp)
- **Looker Studio**: A free and powerful business intelligence tool for creating interactive dashboards and reports. It connects natively to BigQuery, enabling self-service analytics for our business teams.
- **Vertex AI**: Google's unified AI platform. We will use it for building and deploying ML models, such as demand forecasting (predicting Bánh Mì sales) or customer sentiment analysis from reviews.
- **Cloud Functions (APIs)**: Serves as a lightweight backend, exposing specific data from BigQuery via simple serverless APIs to our internal Operations App.
## 3. Security, Compliance, & Vietnamese Market Fit

### Security Measures (Biện pháp Bảo mật)
- **IAM (Identity and Access Management)**: We will follow the principle of least privilege. Each service and user will have granular permissions specific to their role. For example, the `ops-app-api` Cloud Function will only have read-access to specific BigQuery tables.
- **VPC Service Controls**: Creates a security perimeter around our data-sensitive services (BigQuery, Cloud Storage) to prevent data exfiltration. All services within the perimeter can communicate freely, but any communication crossing the boundary is blocked unless explicitly allowed.
- **Encryption at Rest & in Transit**: All data within Google Cloud is encrypted by default. We will use Google-managed encryption keys, with the option to use Customer-Managed Encryption Keys (CMEK) via Cloud KMS for an added layer of control over data in BigQuery and Cloud Storage.
- **Data Catalog**: To tag and classify sensitive data (e.g., PII - Personally Identifiable Information), which is crucial for compliance and applying appropriate security controls.

### Compliance with Vietnam's Decree 13 (Tuân thủ Nghị định 13)
- **Data Subject Consent**: The platform must be designed to capture and manage user consent. This consent must be explicitly given for the processing of personal data.
- **Onshore Data Storage**: While Decree 13 has nuances, the safest approach is to ensure that all personal data of Vietnamese citizens is stored and processed within Google Cloud's regions in Asia (e.g., Singapore, Jakarta) and ideally demonstrate the capability to store it physically in Vietnam if required by law in the future. Our architecture supports this by allowing us to specify the location for Cloud Storage buckets and BigQuery datasets.
- **Data Access & Deletion Requests**: The platform must include a mechanism for users to request access to their data or to have it deleted. We can build a Cloud Function endpoint to handle these requests, which would then interact with BigQuery to fulfill them. A log of these requests must be maintained for audit purposes.
- **Data Breach Notification**: We must have a clear process for identifying and reporting data breaches to the authorities and affected individuals within 72 hours, as stipulated by Decree 13. Cloud Audit Logs and Security Command Center will be our primary tools for detection and investigation.