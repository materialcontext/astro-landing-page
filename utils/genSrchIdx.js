// imports
const
    fs = require('fs'),
    matter = require('gray-matter'),
    strip = require('remove-markdown'),
    lunr = require('lunr');

// gather the documents
const docs = fs.readdirSync('./src/pages/posts').map(file => {
    const {data, content} = matter(fs.readFileSync(`./src/pages/posts/${file}`, 'utf8'));
    const doc = {
        "id": data.id,
        "title": data.title,
        "tags": data.tags,
        "content": strip(content).replace(/(\r\n|\n|\r)/gm, " ")
    }
    return doc;
});

// create the search index
const idx = lunr(function() {
    this.ref('id');
    this.field('title', {boost: 10});
    this.field('tags', {boost: 5});
    this.field('content');
    docs.forEach(doc => this.add(doc));
});

fs.writeFileSync('./src/data/search-index.json', JSON.stringify(idx));      // write the index to a file


// create a document to source the results from
const results = {};
docs.forEach(doc => {
    results[doc.id] = {
        tags: doc.tags.split(', '),
        title: doc.title,
        content: doc.content.substring(0, 250) + '...'
    }
});

fs.writeFileSync('./src/data/search-results.json', JSON.stringify(results));        // write the results document to a file