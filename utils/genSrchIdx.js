const
    fs = require('fs'),
    matter = require('gray-matter'),
    strip = require('remove-markdown'),
    lunr = require('lunr');

// gather the documents
const docs = fs.readdirSync('./src/pages/posts').map(file => {
    const {data, content} = matter(fs.readFileSync(`./src/pages/posts/${file}`, 'utf8'));
    const doc = {
        "slug": file.replace('.md', ''),
        "title": data.title,
        "content": strip(content).replace(/(\r\n|\n|\r)/gm, " ")
    }
    return doc;
});

// create the index
const idx = lunr(function() {
    this.ref('slug');
    this.field('title');
    this.field('content');
    docs.forEach(doc => this.add(doc));
});

// write the index to a file
fs.writeFileSync('./src/data/search-index.json', JSON.stringify(idx));

// create the results document
const results = {};
docs.forEach(doc => {
    results[doc.slug] = {
        title: doc.title,
        content: doc.content
    }
});

// write the results document to a file
fs.writeFileSync('./src/data/search-results.json', JSON.stringify(results));