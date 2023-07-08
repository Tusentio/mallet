# mallet

```ts
import { createView } from "mallet";
import { minify } from "html-minifier";
import escapeHTML from "escape-html";

const html = createView((text) => minify(text, { collapseWhitespace: true }));

html`
    <div>
        <h1>Hello World</h1>
        <p>${"Hello World"}</p>
        <p>${escapeHTML("<p>Hello World</p>")}</p>

        ${() => {
            for (let i = 0; i < 10; i++) {
                // This works!
                html`<p>${i}</p>`;

                // This also works!
                html("<p>" + i + "</p>");
            }
        }}

        ${() => {
            let text = "";
            for (let i = 0; i < 10; i++) {
                text += `<p>${i}</p>`;
            }

            // This works!
            return text;
        }}

        ${() => {
            html`<p>This will not be included.</p>`;

            // Returns are prioritized.
            return "<p>This will be included.</p>";
        }}

        ${html`
            <p>This does NOT work and will cause infinite recursion!</p>
        `}
    </div>
`;

console.log(html.toString());
```
