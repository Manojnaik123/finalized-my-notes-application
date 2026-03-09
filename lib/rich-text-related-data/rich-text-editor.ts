export const editorStyle : string = `
[&_.tiptap]:outline-none
[&_.tiptap]:ring-0
[&_.tiptap]:border-none
[&_h1]:text-3xl
[&_h1]:text-foreground 
[&_h1]:font-semibold
[&_h1]:py-2

[&_h2]:text-2xl
[&_h2]:text-foreground 
[&_h2]:font-semibold
[&_h2]:py-2

[&_h3]:text-1xl
[&_h3]:text-foreground 
[&_h3]:font-semibold
[&_h3]:py-2

[&_p]:text-sm
[&_p]:text-foreground/50
[&_p]:py-1

[&_li]:text-sm
[&_ul]:list-disc
[&_ol]:list-decimal
[&_ul]:ml-6
[&_ol]:ml-6
[&_li]:mb-1
[&_li]:py-1
[&_li]:text-md
[&_li]:text-foreground/60

[&_ul]:py-2
[&_ul]:text-lg

[&_ol]:py-2
[&_ol]:text-lg

[&_pre]:bg-foreground/3
[&_pre]:p-2
[&_pre]:rounded-sm
[&_pre]:overflow-x-auto

[&_pre]:my-4
[&_pre]:mr-1
[&_pre]:scrollbar-custom

[&_code]:text-foreground/70
[&_code]:px-1
[&_code]:py-0.5
[&_code]:rounded

[&_blockquote]:border-l-2
[&_blockquote]:border-accent
[&_blockquote]:pl-4
[&_blockquote]:italic
[&_blockquote]:text-muted-foreground
[&_blockquote]:my-2
[&_blockquote]:bg-sidebar
[&_blockquote]:py-2

[&_p]:pl-
[&_ul]:pl-6
[&_ol]:pl-6
[&_pre]:pl-4
[&_h1]:pl-1
[&_h2]:pl-1
[&_h3]:pl-1

[&_h1]:text-foreground
[&_h2]:text-foreground/90
[&_h3]:text-foreground/80
[&_p]:text-foreground/70    
[&_li]:text-foreground/70   
[&_code]:text-foreground/80
[&_code]:bg-muted
[&_pre]:bg-muted/50
[&_pre]:border
[&_pre]:border-border
[&_blockquote]:bg-muted/30
[&_hr]:border-border/50
`

export const headers = [
  {
    value: 1,
    headerName: 'Paragraph'
  },
  {
    value: 2,
    headerName: 'Header 1'
  },
  {
    value: 3,
    headerName: 'Header 2'
  },
  {
    value: 4,
    headerName: 'Header 3'
  },
]

export const dummyData : string = `<h1>Heading 1 Title</h1>
<h2>Heading 2 Subtitle</h2>
<h3>Heading 3 Section</h3>

<p>This is a regular paragraph with <strong>bold text</strong>, <em>italic text</em>, <u>underlined text</u>, and <s>strikethrough text</s> all in one line.</p>

<p>This paragraph has <code>inline code</code> and <mark>highlighted text</mark> inside it.</p>

<blockquote>This is a blockquote. It should have a left border and italic styling with a muted background.</blockquote>

<ul>
  <li>First bullet item</li>
  <li>Second bullet item</li>
  <li>Third bullet item with <strong>bold</strong> inside</li>
</ul>

<ol>
  <li>First numbered item</li>
  <li>Second numbered item</li>
  <li>Third numbered item with <em>italic</em> inside</li>
</ol>

<pre><code>const hello = "world"
function greet() {
  console.log(hello)
  return hello
}</code></pre>

<hr />

<p>Paragraph after the horizontal rule. The rule above should be a subtle divider line.</p>`