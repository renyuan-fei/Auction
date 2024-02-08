FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/IdentityService/IdentityService.csproj", "src/IdentityService/"]
COPY ["src/AuctionService/AuctionService.csproj", "src/AuctionService/"]
COPY ["src/SearchService/SearchService.csproj", "src/SearchService/"]
COPY ["src/BiddingService/BiddingService.csproj", "src/BiddingService/"]
COPY ["src/GatewayService/GatewayService.csproj", "src/GatewayService/"]
COPY ["src/NotificationService/NotificationService.csproj", "src/NotificationService/"]
COPY ["src/Contracts/Contracts.csproj", "src/Contracts/"]

RUN dotnet restore "src/IdentityService/IdentityService.csproj"
COPY . .
WORKDIR "/src/src/IdentityService"
RUN dotnet build "IdentityService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "IdentityService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IdentityService.dll"]
