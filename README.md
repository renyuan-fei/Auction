# Auction Service

<p align="center">
<img src="https://socialify.git.ci/renyuan-fei/Auction/image?description=1&amp;descriptionEditable=A%20Website%20for%20%20auctioning%20cars%20in%20real-time&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Plus&amp;theme=Auto" alt="project-image">
</p>
This is a repository for the Microservices 'Auction' app that is used for auctioning cars.

<h2>🚧 Architecture</h2>

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot 2024-03-26 at 17.28.28.png" alt="project-screenshot" width="800" height="400/">

<h2>🚀 Demo</h2>

[https://app.auctionservice.store](https://app.auctionservice.store)

<h2>🧐 Features</h2>

Here're some of the project's best features:

* Using IdentityService for login and registration
* Adding and removing vehicles for auction
* Searching and filtering based on conditions
* Users can bid in real-time against others

<h2>💻 Built with</h2>

Technologies used in the project:

* React.js
* Next.js
* ASP .NET Core
* Typescript
* C#
* tailwind css
* PostgreSQL
* MonaoDB
* gPRC
* Polly
* SignalR
* Nginx
* RabbitMQ
* IdentityServer
* Docker
* Kubernetes(K8S)
* Xunit

<h2>🛠️ Installation Steps:</h2>

1. Using your terminal or command prompt clone the repo onto your machine in a user folder

```
git clone https://github.com/renyuan-fei/Auction.git
```

2. Change into the Auction directory

```
cd Auction
```

3. Ensure you have Docker Desktop installed on your machine. If not download and install
   from Docker and review their installation instructions for your Operating
   system [here](https://docs.docker.com/desktop/).
4. Build the services locally on your computer by running (NOTE: this may take several
   minutes to complete):

```
docker compose build
```

5. Once this completes you can use the following to run the services:

```
docker compose up -d
```

6. To see the app working you will need to provide it with an SSL certificate. To do this
   please install 'mkcert' onto your computer which you can get
   from [here](https://github.com/FiloSottile/mkcert). Once you have this you will need to
   install the local Certificate Authority by using:

```
mkcert -install
```

7. You will then need to create the certificate and key file on your computer to replace
   the certificates that I used. You will need to change into the 'devcerts' directory and
   then run the following command:

```
cd devcerts
mkcert -key-file auctionservice.com.key -cert-file auctionservice.com.crt app.auctionservice.com api.auctionservice.com id.auctionservice.com
```

8. You will also need to create an entry in your host file so you can reach the app by its
   domain name. Please use
   this [guide](https://phoenixnap.com/kb/how-to-edit-hosts-file-in-windows-mac-or-linux)
   if you do not know how to do this. Create the following entry:

```
127.0.0.1 id.auctionservice.com app.auctionservice.com api.auctionservice.com
```

Or your can run the bash script, it will help you to write

*Windows*

On Windows, you need to use a tool like Git Bash, Cygwin, or the Windows Subsystem for
Linux (WSL) to run shell scripts. Assuming you're using Git Bash, open it and change to
the directory that contains the script:

```shell
bash update_hosts.sh
```

*Linux*

Open your terminal and navigate to the directory that contains the update_hosts. sh file.
You can change to the directory by using the cd command:

```shell
chmod +x update_hosts.sh
sudo ./update_hosts.sh
```

*MacOS*

For macOS, the process is nearly identical to Linux. Open your Terminal app (found in
Utilities). Change to the directory:

```shell
chmod +x update_hosts.sh
sudo ./update_hosts.sh
```

<h2>Project Screenshots:</h2>

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot%202024-02-09%20at%2020.10.05.png" alt="project-screenshot" width="800" height="400/">

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot%202024-02-09%20at%2020.11.38.png" alt="project-screenshot" width="800" height="400/">

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot%202024-02-09%20at%2020.12.14.png" alt="project-screenshot" width="800" height="400/">

<img src="https://renyuan-fei.github.io/Media/Auctions/Capture-2024-02-09-201027.png" alt="project-screenshot" width="800" height="400/">

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot%202024-02-09%20at%2020.13.42.png" alt="project-screenshot" width="800" height="400/">

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot%202024-02-09%20at%2020.19.37.png" alt="project-screenshot" width="800" height="400/">

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot%202024-02-09%20at%2020.13.59.png" alt="project-screenshot" width="800" height="400/">

<img src="https://renyuan-fei.github.io/Media/Auctions/Screenshot%202024-02-09%20at%2020.18.11.png" alt="project-screenshot" width="800" height="400/">