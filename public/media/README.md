# 📸 Adding your photos

The website is designed to look complete **before** any photos are added — every
gallery shows an elegant, on-theme placeholder. When you're ready to add real
memories, it takes two small steps.

## 1. Drop your images into the right chapter folder

```
public/media/
├── childhood/
├── eyes/
├── beginning/
├── first-picture/
├── everyday/
├── trips/
├── ramadan/
├── gifts/
├── love/
├── doctor/      ← Manonty
├── engineer/    ← Boody
└── today/
```

Use any web-friendly format (`.jpg`, `.png`, `.webp`, `.avif`). Next.js
optimises them automatically (resizing, modern formats, lazy-loading), so you
can drop in full-resolution photos without worrying about performance.

## 2. Point a slot at your file

Open **`content/media.ts`** and give the slot a `src`:

```ts
// before (placeholder)
{ id: "childhood-1", alt: "…", aspect: "portrait" }

// after (your photo)
{ id: "childhood-1", src: "/media/childhood/01.jpg", alt: "Boody, age 5", caption: "Before we knew", aspect: "portrait" }
```

That's it — the gallery, the lightbox, and the memory search all update
automatically.

### Tips

- **`aspect`** can be `portrait`, `landscape`, `square`, `tall`, or `wide`.
- **`focus`** (optional) nudges the crop, e.g. `focus: "50% 30%"` to keep faces in view.
- **`caption`** appears on hover and in the lightbox, and is searchable.
- Add as many new slots as you like — the galleries grow to fit.

## Special photos

- **Our Eyes** (`eyes/`) uses exactly three slots: his, hers, then both.
- **Gifts** (`gifts/`) opens from the treasure box — the first slot pairs with the "First Gold Gift" feature.
