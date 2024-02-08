FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/NotificationService/NotificationService.csproj", "src/NotificationService/"]
COPY ["src/AuctionService/AuctionService.csproj", "src/AuctionService/"]
COPY ["src/SearchService/SearchService.csproj", "src/SearchService/"]
COPY ["src/BiddingService/BiddingService.csproj", "src/BiddingService/"]
COPY ["src/GatewayService/GatewayService.csproj", "src/GatewayService/"]
COPY ["src/IdentityService/IdentityService.csproj", "src/IdentityService/"]
COPY ["src/Contracts/Contracts.csproj", "src/Contracts/"]

RUN dotnet restore "src/NotificationService/NotificationService.csproj"
COPY . .
WORKDIR "/src/src/NotificationService"
RUN dotnet build "NotificationService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "NotificationService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NotificationService.dll"]
