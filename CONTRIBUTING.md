# Contributing to PulseLink

Thank you for contributing to PulseLink.

## Getting Started

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd Pulselink
```

---

## Project Structure

```text
Pulselink/
├── frontend/
├── backend/
├── docs/
├── spec-kit/
└── README.md
```

---

## Development Workflow

### Step 1

Create a new branch:

```bash
git checkout -b feature/feature-name
```

### Step 2

Make your changes.

### Step 3

Run tests.

### Step 4

Commit changes:

```bash
git add .
git commit -m "Added feature"
```

### Step 5

Push changes:

```bash
git push origin feature/feature-name
```

### Step 6

Create a Merge Request.

---

## Coding Standards

### Frontend

* Use React functional components.
* Use Tailwind CSS.
* Keep components reusable.
* Use meaningful names.

### Backend

* Use FastAPI best practices.
* Use SQLAlchemy ORM.
* Validate requests using Pydantic.
* Keep routes modular.

---

## Commit Message Format

Examples:

```text
feat: added donor registration API
fix: corrected blood matching logic
docs: updated user manual
style: improved landing page design
```

---

## Pull Request Requirements

Before creating a Merge Request:

* Code builds successfully.
* No console errors.
* APIs tested.
* Documentation updated.
* Code reviewed.

---

## Reporting Issues

Include:

* Description
* Steps to reproduce
* Expected behavior
* Screenshots if applicable