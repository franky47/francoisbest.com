Objective: reducing the amount of cognitive load to author blog posts.

Things that bring friction:

- Having to think about a filesystem
- Having to think about versioning (commit & push)
- Having to use a particular setup machine
- Having to deal with GitHub being down

Desired features:

- Writing markdown, maybe with GFM syntax (tables)
- Writing anywhere: mobile or desktop
- Having a preview (not necessarily live) of the result,
  but not authoring in that preview.
- Push of a button to save and publish changes
- Owning our content: plain old markdown files on the filesystem
  or in a database under our control.
- Search: how do we make content searchable, other than SEO?
- Not trusting a large 3rd party with hosting (eg: GitHub)

It appears that content should be separate from the website code,
otherwise Git histories may conflict and introduce friction.
