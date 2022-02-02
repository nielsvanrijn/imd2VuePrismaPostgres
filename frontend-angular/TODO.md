# TODO

- [ ] add a movie


#### Now
- [x] make a button component
- [x] replace all buttons with button component
- [x] movie page wait till getMovie is done (like in edit-account userService.user$ | async as user)
- [x] Use node js script to generate actors and put them in the `persons.ts` seeder (also get headshot, and upload it to uploads.nielsvanrijn.nl to get avatarUrl)
- [x] Fix multiselect
options [{id: 1, name: 'Niels', person: {id: 1, avatarUrl: 'an url'}}] ===>
return value [{id: 1, name: 'Niels', person: {id: 1, avatarUrl: 'an url'}}]

Instead of:

options [{id: 1, name: 'Niels', person: {id: 1, avatarUrl: 'an url'}}] ===>
return value [1, 2]
- [x] Update doesnt work (Unique constraint failed on the fields) ??? i think scema change is necceary
- [x] Previous works but is why is the CharactersOnPersons neccery??? can it be deleted (upates to a movie cast are hard to sync to the CharactersOnPersons table)
solution = dont use it
- [ ] Multiselect pagination

#### Later
- [ ] make a dropdown component (for menu) (different from single-select component)
- [ ] fix multiselect options type (is now Array<any>)
- [ ] Change all hero icons to fontawesome (where it looks nicer)
- [ ] make a multi select component (filters)
- [ ] Fix multiselect keyDown performance with large lists