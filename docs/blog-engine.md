# Blog engine

Blog posts are local static MDX pages using the app router page convention name
of `post-url-slug/page.mdx`.

They have an exported `metadata` object that follows the Next.js `<head/>`
meta tag convention for `title` and `description`, plus some other blog-related
metadata like:

- `publicationDate` (string or Date) for published posts (posts missing this
  property are considered drafts)
- `tags` (array of strings) for related content filtering on the index page

## Index page

URL: `/posts`

Available content is listed using a glob pattern to find all files matching
the `**/page.mdx` pattern in the content directory.

From those file paths, the exported metadata header is extracted, interpreted
and parsed to populate a metadata object. Along with resolution of the
corresponding URL path where the post will be served from, those metadata are
used to render a listing of available blog posts.

Posts are sorted by:

- Drafts first, in alphabetical order of title
- Published posts, most recent first

## RSS / Atom / JSON feeds

Generated from an API route at `/posts/feed/[format]/route.ts`.

Like before, full content probably won't be available in the feeds, but only
show the description and a link to the full article.
This is because posts may include interactive content that won't work in RSS
readers.
