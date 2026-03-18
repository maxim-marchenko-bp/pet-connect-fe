# User profile

## Create pet

- [x] Add "Create pet" / "Add pet" button in user profile
- [ ] Implement pet information form with fields:
  - [ ] Name
  - [ ] Type (dog, cat, etc.)
  - [ ] Breed
  - [ ] Age
  - [ ] Gender
  - [ ] Photo / avatar
  - [ ] Additional notes

## Pet management

- [ ] Add pet to profile (persist to backend)
- [ ] Remove pet from profile
- [ ] Edit pet information
- [ ] View pet information (profile & detail view)

---

Notes:
- Start by adding the button and a modal or separate page for the form.
- Reuse existing `pet` models under `src/domain/pet` and form components in `src/components/ui`.
- Consider validations for required fields and image upload handling.
