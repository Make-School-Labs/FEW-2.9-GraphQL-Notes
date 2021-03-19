/* eslint-disable semi */

async function feed(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  // const queriedLinks = await ctx.db.query.links({ first, skip, where })
  const queriedLinks = await ctx.prisma.links({ first, skip, where })

  console.log(queriedLinks)
  // console.log(queriedLinks.length)
  // console.log(queriedLinks.map(link => link.id))

  return {
    linkIds: queriedLinks.map(link => link.id),
    links: queriedLinks,
    count: queriedLinks.length,
  }
}

// async function feed(parent, args, context, info) {
//   const where = args.filter ? {
//     OR: [
//       { description_contains: args.filter },
//       { url_contains: args.filter },
//     ],
//   } : {}

//   const links = await context.prisma.links({
//     where,
//     skip: args.skip,
//     first: args.first,
//     orderBy: args.orderBy,
//   })
//   const count = await context.prisma
//     .linksConnection({
//       where,
//     })
//     .aggregate()
//     .count()

//   console.log(links)

//   return {
//     links,
//     count,
//   }
// }

module.exports = {
  feed,
}
