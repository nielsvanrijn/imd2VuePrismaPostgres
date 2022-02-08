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
- [x] Add avatar to Multiselect
- [x] Add filter to Multiselect
- [x] make a dropdown component (for menu) (different from single-select component)
- [ ] empty filter still filters out movies without relations (empty genre, cast, director, writer)
- [ ] Multiselect tab closes list
- [ ] Add single toggle option to dropdown component
- [ ] Add max-height + scroll to dropdown component
- [ ] Add avatar to optoins in dropdown component
- [ ] Add filter in dropdown component
- [x] Add and pick multiple posterUrls to movie (keep index in db)
- [x] Update and delete posterUrls
- [ ] Add and pick multiple trailerUrlss to movie (keep index in db)

#### Later
- [ ] Change all hero icons to fontawesome (where it looks nicer)
- [ ] Multiselect options type (is now Array<any>)
- [ ] Multiselect pagination (load on scroll)
- [ ] Multiselect optimalisation (only send id and name?)