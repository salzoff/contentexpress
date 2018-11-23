export default `
    pr.{
        "Name": vn[0],
        "Code": vc[0],
        "Id": vi[0],
        "LogoSmall": provider_logo[0].provider_logo_url[0].v,
        "LogoMedium": provider_logo[0].provider_logo_url[1].v,
        "LogoLarge": provider_logo[0].provider_logo_url[2].v,
        "LogoXLarge": provider_logo[0].provider_logo_url[3].v
    }
`;