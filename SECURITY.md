# Security Policy

## Supported Versions

The following versions of PulseLink are currently supported with security updates:

| Version | Supported |
| ------- | --------- |
| 1.0.x   | ✅         |
| < 1.0   | ❌         |

## Reporting a Vulnerability

The PulseLink team takes security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

Please provide the following information:

* Description of the vulnerability
* Steps to reproduce the issue
* Potential impact
* Suggested remediation (if known)

### Response Process

After receiving a report, we will:

1. Acknowledge receipt of the report.
2. Investigate the vulnerability.
3. Develop and test a fix.
4. Release a patch if necessary.
5. Notify affected users.

### Responsible Disclosure

Please do not publicly disclose security vulnerabilities until they have been reviewed and resolved by the project maintainers.

## Security Best Practices

When deploying PulseLink:

* Use strong database credentials.
* Store secrets in environment variables.
* Never commit `.env` files to version control.
* Keep dependencies updated.
* Enable HTTPS in production environments.
* Regularly review access permissions.

## Contact

For security-related concerns, please contact the project maintainers through the repository issue tracker or official project communication channels.
