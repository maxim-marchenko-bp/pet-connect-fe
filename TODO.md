# User profile

## Create pet

- [x] Add "Create pet" / "Add pet" button in user profile
- [x] Implement pet information form with fields:
  - [x] Name
  - [x] Type (dog, cat, etc.)
  - [x] Age

## Pet management

- [x] Add pet to profile (persist to backend)
- [ ] Remove pet from profile
- [ ] Edit pet information
- [ ] View pet information (profile & detail view)

---

Notes:
- Start by adding the button and a modal or separate page for the form.
- Reuse existing `pet` models under `src/domain/pet` and form components in `src/components/ui`.
- Consider validations for required fields and image upload handling.
