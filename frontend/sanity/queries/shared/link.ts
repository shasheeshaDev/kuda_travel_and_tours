export const linkQuery = `
    _key,
    ...,
    "href": select(
      isExternal                                                                         => href,
      defined(anchor) && @.internalLink->slug.current == "index"                        => "/#" + anchor,
      defined(anchor) && defined(@.internalLink->slug.current)                          => "/" + @.internalLink->slug.current + "#" + anchor,
      defined(anchor)                                                                    => "/#" + anchor,
      @.internalLink->slug.current == "index"                                           => "/",
      @.internalLink->_type == "post"                                                   => "/blog/" + @.internalLink->slug.current,
      defined(@.internalLink->slug.current)                                             => "/" + @.internalLink->slug.current,
      null
    )
`;
