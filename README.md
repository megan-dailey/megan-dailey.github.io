# megan-dailey.github.io

Source of the website at **https://megan-dailey.github.io**.

The site is built with [Astro](https://astro.build), a JavaScript tool that turns a few text files into a static web page. You don't need to know JavaScript: all the content is plain text files, and you only need a handful of commands to preview it on your computer.

Every push to `main` rebuilds and publishes the site automatically, about 2 minutes later.

## One-time setup

### 1. Install Node.js

Node.js is what runs JavaScript tools on your computer, a bit like Python runs `.py` scripts. It comes with **npm**, which downloads the libraries the site needs (similar to `pip`). The site uses **Node 22**.

Pick **one** of these:

- **Simplest:** download the **22.x LTS** installer from [nodejs.org](https://nodejs.org/en/download) and run it.
- **With a version manager** (handy if you already use other Node projects): install [fnm](https://github.com/Schniz/fnm#installation) (on macOS: `brew install fnm`, then follow the shell setup it prints). Inside this folder, run `fnm use --install-if-missing`: it reads the `.node-version` file and installs Node 22.

Check it worked by opening a **new** terminal window and running:

```bash
node --version
```

It should print something starting with `v22`.

### 2. Install the site's dependencies

From the repository folder:

```bash
npm install
```

This downloads Astro into a `node_modules/` folder. It's a big folder, but it's ignored by git and you never need to look in it. If anything ever behaves strangely, delete `node_modules/` and run `npm install` again.

## Day-to-day workflow

```bash
git pull
npm run dev
```

`npm run dev` starts a local preview at **http://localhost:4321**. Leave it running while you edit: every time you save a file, the page in your browser updates by itself. Stop it with `Ctrl+C`.

When you're happy with the changes:

```bash
npm run build
git add -A
git commit -m "Add new publication"
git push
```

`npm run build` produces the final site exactly as the online build does. If it finishes with `Complete!`, the deploy will work. If it fails, it names the file and the problem (see [Troubleshooting](#troubleshooting)). Pushing a broken change won't take the site down, the previous version simply stays online, but it's quicker to catch it locally.

After pushing, you can follow the deploy in the **Actions** tab of the repository on GitHub.

## Which file to edit

| I want to change…                              | Edit this file                                          |
| ---------------------------------------------- | ------------------------------------------------------- |
| The "About" text                               | [`src/content/about.md`](src/content/about.md)          |
| Publications (one file per paper)              | [`src/content/publications/`](src/content/publications) |
| My name, job title, university, links, contact | [`src/content/site.ts`](src/content/site.ts)            |
| My photo                                       | [`public/prof_pic.jpg`](public/prof_pic.jpg)            |
| A PDF (CV, paper)                              | put it in [`public/`](public)                           |

Everything else is the page layout and build configuration; you shouldn't need to touch it.

### About text

[`src/content/about.md`](src/content/about.md) is Markdown: blank line between paragraphs, `**bold**`, `*italic*`, `[link text](https://example.com)`.

### Publications

Each paper is its own Markdown file in [`src/content/publications/`](src/content/publications). To add one, create a new `.md` file there (or copy an existing one). The file name is up to you, it never appears on the site; something like `2025-short-title.md` keeps the folder tidy. To remove a paper, delete its file.

The file only contains a header between two `---` lines, in [YAML](https://learnxinyminutes.com/docs/yaml/) (`field: value`, one per line):

```md
---
title: Title of the paper
authors: [Megan M. Dailey, Second Author, Third Author]
year: 2025
type: Article
journal: Journal Name
details: 12(3), 45–67
doi: 10.1177/02676583231234567
pdf: /my-paper.pdf
---
```

| Field     | Required? | Notes                                                                             |
| --------- | --------- | --------------------------------------------------------------------------------- |
| `title`   | yes       | If it contains a colon `:`, wrap the whole title in double quotes.                |
| `authors` | yes       | Comma-separated, inside `[ ]`. Names starting with "Megan" are shown in bold.     |
| `year`    | yes       | Papers are grouped by year, newest first.                                         |
| `type`    | yes       | One of `Article`, `Ph.D. thesis`, `Conference`, `Chapter`.                        |
| `journal` | no        | Shown in italics.                                                                 |
| `details` | no        | Volume, issue, pages, or the university for a thesis. Shown after the journal.    |
| `doi`     | no        | Just the DOI (`10.…`), not the full URL. Adds a "DOI" link.                       |
| `pdf`     | no        | Path to a file in `public/` (e.g. `/my-paper.pdf`) or any URL. Adds a "PDF" link. |

Delete optional lines you don't need. If a field is missing or misspelled, `npm run dev` and `npm run build` say which file and which field.

To add a new `type`, add it to the list in `src/content.config.ts`.

### Name, links and contact

[`src/content/site.ts`](src/content/site.ts) is a small TypeScript file: only change the text between double quotes. To add a profile link, add a line to `links`:

```ts
    { label: "ORCID", href: "https://orcid.org/0000-0000-0000-0000" },
```

The email is written out as "megan dot dailey at unil dot ch" on purpose, so spam bots can't harvest it.

### Photo and PDFs

Files in `public/` are served as-is from the site root: `public/cv.pdf` becomes `https://megan-dailey.github.io/cv.pdf`.

- **Photo:** replace `public/prof_pic.jpg`, keeping the same name. Square works best.
- **CV:** add `public/cv.pdf`, then in [`src/content/site.ts`](src/content/site.ts) remove the leading `// ` from the `CV (PDF)` line (`//` comments a line out).

## Troubleshooting

| Problem                                           | Fix                                                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command not found: npm` / `node`                 | Node isn't installed or the terminal was opened before installing it. Open a new terminal; with fnm, run `fnm use` in this folder.                      |
| `data does not match collection schema`           | A publication file has a missing or misspelled field, or a `type` not in the list. The message names the file and the field.                            |
| ``Expected `,` or `}` ``                          | A missing comma, quote or bracket in `site.ts`, at the line it names.                                                                                   |
| `Cannot find module` / `astro: command not found` | Run `npm install`.                                                                                                                                      |
| Port 4321 already in use                          | Another `npm run dev` is still running in another terminal. Stop it, or use the other address it prints.                                                |
| `git status` shows `package-lock.json` changed    | Usually harmless after `npm install` on another Node version. Discard it with `git checkout package-lock.json` unless you meant to update dependencies. |

## How it fits together

- `src/pages/index.astro`: the page template (HTML with `{…}` placeholders filled from `src/content/`).
- `src/content.config.ts`: the list of fields a publication file can have.
- `src/styles/global.css`: colours, fonts and layout.
- `package.json`: the project's dependencies and the `dev` / `build` commands. `package-lock.json` pins exact versions; commit it but don't edit it by hand.
- `.github/workflows/deploy.yml`: on every push to `main`, GitHub runs `npm ci && npm run build` and publishes the `dist/` folder to the `gh-pages` branch, which GitHub Pages serves.
