# Lost in a Neon City

Lost in a Neon City is a static, cyberpunk-themed choose-your-own-adventure built as an HTML and CSS coursework project. Fifteen linked pages form a branching story with multiple routes, a hidden chamber, and distinct win and loss outcomes.

## What is implemented

- 15 hand-authored HTML pages with 30+ story choices
- Multiple routes that reconnect across the market, library, rooftop, subway, tunnel, bridge, and arcade
- Responsive shared styling for desktop and mobile
- Local images, audio, and video plus an optional YouTube embed
- Keyboard-accessible links and media controls, skip links, visible focus, and reduced-motion support
- A dependency-free site check for internal links, referenced assets, basic document structure, image alternatives, and unexpected autoplay

## Run locally

No build step or package installation is required. From the repository root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` and choose a path.

## Verify

```bash
python scripts/check_site.py
```

The check runs in GitHub Actions for pull requests and changes to the default branch.

## Project structure

- `index.html` starts the story.
- Location pages contain the branching choices.
- `you_win.html` and `you_lose.html` provide the outcomes.
- `sitemap.html` documents the full route map.
- `styles.css` contains the shared responsive presentation.
- `images/` and `media/` contain the bundled coursework assets.

## Limitations

- The project intentionally uses page-to-page navigation rather than application state.
- Progress is not saved between pages.
- The optional embedded video requires a network connection and is provided by YouTube.
- The repository does not document original licensing or provenance for the bundled image, audio, and video assets; verify usage rights before redistributing them outside this coursework project.
