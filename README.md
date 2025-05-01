## how to add pages
add markdown files to the content folder then update WebLinks.js to add a new block that links to the new page. 

## Usage
`nxt-lnk` template used to create your custom bio link and self-host on Vercel or Netlify using your own domain. Need little understanding of code :) ☕

Usually, you don't need to worry a lot about coding if you're just updating information in `BioData.js` and `LinkData.js`. To deep dive know more  [Next.js](https://nextjs.org/docs) and [React](https://reactjs.org/docs/getting-started.html) official documentaion.

For customization used [styled components](https://styled-components.com/). If you want to customize styling you can [learn more here](https://styled-components.com/docs).

**Template auto support dark-mode depending on system cofig.**


## Getting Started

Install using 
`pnpm install`

First, run the development server:
```bash
npm run dev
# or
yarn dev
```

**Important files to edit or update info**
`data/BioData.js` All basic info update here
`data/LinksData.js` Contain all the links
`Components/WebLinks.js` UI and stylesheet
`Components/icons/index.js` Contain all SVG icon compo

You can start editing the page by modifying `data/BioData.js` and `data/LinksData.js`. The page auto-updates as you edit the file.



## Images
All images stored inside `public` folder of the project.


**Avatar**
Just replace `avatar.png`. 200x200px will be good.

**Hex/NFT avatar view**
`nftAvatar: true` enable hex shape on avatar image.
`nftAvatar: false` made it in oval shape.

**Title**
By default `titleImg: true` and it look for `title.svg`. Replace svg with logo **logo**. Make sure to use `title.svg ` name.

**Featured banner**
`newProductUrl` and `newProduct` used for getting featured banner. You can replace the image `newproduct.png`  with any design you like.

`newProduct: true` show banner. Default is `true` make it false to hide.

**Add new Social Media link**
create a new block by copying this
```jsx
    {
        title: 'Social Name',
        url: 'https://link.com/whateverurl',
        type: 'social',
        icon: '/newiconname.svg',
        on: true
    }
```
Update all info and make sure to add a `newiconname.svg` file in [public](#images) folder.
Then you have to add new section to frontend `components/WebLinks.js`

## Frontend
All frontend customization done inside `components/WebLinks.js`. If you wante to update and add new section just look this file and update according to your need.

**Update section**

Look for Section codes. Like if you want to change `install` type to `featured` Update  the `type: 'featured'` in `LinkData.js` then update all `install` related code in `WebLinks.js` to `featured`

```js
// Collect all links filter by type - social, project, nft and other etc=
// get data for install section
const install = allLinks.filter((el) => {
  return el.type === "install" && el.on
});

...
...

{/* Featured Section */ }
<LinkSection>
  <h3>{install[0].type}</h3>
  {
    install.map((i) => {
      return (
        <Link href={i.url} passHref key={i.title}>
          <LinkBox>
            <LinkTitle><img src={i.icon} style={{ filter: 'var(--img)' }} /> {i.title}</LinkTitle> <NewUp />
          </LinkBox>
        </Link>
      )
    })
  }
</LinkSection>
{/* End Featured Section */ }
```
**Add New section**

Add new section with specific `type` in `Linkdata.js`. Then copy `LinkSection` Code to create new section in `WebLinks.js` file. Make sure to create get data of that section as well.
      
