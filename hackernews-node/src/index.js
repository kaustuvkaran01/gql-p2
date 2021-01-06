const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let links = [{
    id:'link-0',
    url:'www.howtographql.com',
    description:'Fullstack tutorial for GraphQL'
},
{
    id:'link-1',
    url:'www.howtographql.com',
    description:'Fullstack tutorial for GraphQL'
}
]

let idCount = links.length

const resolvers = {
    Query: {
        // info: () => `This is the API of a Hackernews Clone`
        info: () => `This is the API for the hackernews clone`,
        feed: () => links,
    },

    Mutation: {
        post:(parent,args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink:(parent,args) => {
            const link = links.find(element => element.id === args.id);
            if(!link){
                throw new Error(`Couldn't find link with id ${id}`);
            }
            link.url = args.url;
            link.description = args.description;
            return link;
        },
        deleteLink:(parent,args) => {
            const l = _.remove(links, (l) => { 
                if(l.id === args.id){
                    console.log(l);
                    return l;
                }
            });
            return l;
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname,'schema.graphql'),
        'utf8'
    ),
    resolvers,
})
server.listen().then(({ url }) => console.log(`Server is running on ${url}`))