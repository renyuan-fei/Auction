﻿using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("auctionApp", "Auction app full access"),
        };

    public static IEnumerable<Client> Clients(IConfiguration config) =>
        new Client[]
        {
            new Client
            {
                ClientId = "postman",
                ClientName = "Postman",
                ClientSecrets = {new Secret("NotASecret".Sha256())},
                AllowedGrantTypes = { GrantType.ResourceOwnerPassword },
                RedirectUris = {"https://www.getpostman.com/oauth2/callback"},
                AllowedScopes = {"openid", "profile", "auctionApp"},
            },
            new Client
            {
                    ClientId = "nextApp",
                    ClientName = "nextApp",
                    ClientSecrets = {new Secret(config["ClientSecret"].Sha256())},
                    AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                    RequirePkce = false,
                    RedirectUris = {config["ClientApp"] + "/api/auth/callback/id-server"},
                    AllowOfflineAccess = true,
                    AllowedScopes = {"openid", "profile", "auctionApp"},
                    AccessTokenLifetime = 3600*24*30,
                    AlwaysIncludeUserClaimsInIdToken = true
            }
        };
}
