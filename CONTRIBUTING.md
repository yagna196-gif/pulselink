# Pulselink - Contributing Guide

## Development Workflow

### Branch Naming Convention
- `feature/` - New features
- `bugfix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions

Example: `feature/sms-broadcast`

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat: add blood request creation endpoint

Add POST /api/requests endpoint that:
- Validates blood request data
- Creates request in database
- Broadcasts SMS to matching donors

Fixes #123
```

### Pull Request Process

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit
4. Push to your fork
5. Create Pull Request with:
   - Clear description of changes
   - Link to related issues
   - Screenshots (if UI changes)
   - Test results

### Code Review Requirements

- Minimum 2 approvals required
- All tests must pass
- No conflicts with main branch
- Code style compliance

## Development Setup

### Backend Development

1. **Install tools**
```bash
npm install -g nodemon
npm install -g jest
```

2. **Run with auto-reload**
```bash
npm run dev
```

3. **Run tests**
```bash
npm test
```

4. **Linting**
```bash
npm run lint
npm run lint:fix
```

### Frontend Development

1. **Run development server**
```bash
npm start
```

2. **Run tests**
```bash
npm test
```

3. **Build for production**
```bash
npm run build
```

## Code Style Guide

### Backend (Node.js)

```javascript
// ✓ DO
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

// ✗ DON'T
const getUserById = (id) => {
  return User.findByPk(id);
};

// Use async/await, not .then()
// Use const, not var
// Add JSDoc comments for functions
```

### Frontend (React)

```jsx
// ✓ DO
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
    </div>
  );
};

// ✗ DON'T
const UserCard = (props) => {
  return <div><h3>{props.user.name}</h3></div>;
};

// Use destructuring
// Use functional components
// Use meaningful variable names
```

## Testing Standards

### Backend Tests

```javascript
describe('User Model', () => {
  test('should create user with valid data', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+919876543210',
      passwordHash: 'hashed_password',
    });
    expect(user.id).toBeDefined();
  });
});
```

### Frontend Tests

```jsx
import { render, screen } from '@testing-library/react';
import DonorRegistration from './DonorRegistration';

test('renders registration form', () => {
  render(<DonorRegistration />);
  expect(screen.getByText(/register as blood donor/i)).toBeInTheDocument();
});
```

### Test Coverage Requirements

- Backend: Minimum 80% coverage
- Frontend: Minimum 70% coverage

## Documentation

### README Files
- Keep up to date with latest changes
- Include setup instructions
- Add troubleshooting section

### Code Comments
- Comment complex logic
- Explain "why", not "what"
- Use JSDoc for functions

### API Documentation
- Keep API docs in sync with code
- Include request/response examples
- Document error codes

## Performance Guidelines

### Backend
- Database queries < 200ms
- API response < 500ms
- Batch operations for bulk data

### Frontend
- First Contentful Paint < 3s
- Interactive < 5s
- Bundle size < 500KB (gzipped)

## Security Checklist

Before submitting code:
- [ ] No hardcoded credentials
- [ ] Input validation present
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens (if applicable)
- [ ] Password properly hashed
- [ ] Rate limiting applied
- [ ] Error messages don't leak info

## Reporting Issues

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to...
2. Click on...
3. See error

**Expected behavior**
What should happen instead.

**Environment**
- OS: [e.g., Ubuntu 20.04]
- Node version: [e.g., 14.17.0]
- Browser: [e.g., Chrome 91]

**Screenshots**
If applicable, add screenshots to help explain the problem.
```

### Feature Request Template

```markdown
**Is your feature related to a problem?**
Describe the problem.

**Describe the solution**
Clear and concise description of what you want to happen.

**Describe alternatives**
Any alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots.
```

## Release Process

### Version Numbering (Semantic Versioning)
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

Format: `v1.2.3`

### Release Steps

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag: `git tag v1.2.3`
4. Push to main branch
5. Create GitHub release with notes

## Resources

- [Git Guide](https://git-scm.com/doc)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)
- [REST API Best Practices](https://restfulapi.net/)

## Questions or Need Help?

- Check existing issues and discussions
- Ask in team Slack channel
- Create a discussion in GitHub

---

**Thank you for contributing to Pulselink! 🩸**
