#!/bin/bash

# Include color variables for better UX
RED="\033[0;31m"
GREEN="\033[0;32m"
BLUE="\033[0;34m"
NORMAL="\033[0m"

# Function to add entry to hosts file
add_entry() {
    echo -e "${BLUE}-------------------------------------------------------"
    echo -e "${BLUE}Checking if entry already exists..."
    if grep -qE '^\s*127\.0\.0\.1\s+id\.auctionservice\.com\s+app\.auctionservice\.com\s+api\.auctionservice\.com\s*$' /etc/hosts; then
        echo -e "${RED}Entry already exists in /etc/hosts. Aborting."
        echo -e "${BLUE}-------------------------------------------------------"
    else
        echo -e "${BLUE}Adding entry to /etc/hosts"
        echo "127.0.0.1 id.auctionservice app.auctionservice api.auctionservice.com" |
        sudo tee -a /etc/hosts > /dev/null
        echo -e "${GREEN}Entry added successfully!"
        echo -e "${BLUE}-------------------------------------------------------"
    fi
}

# Function to remove entry from hosts file
remove_entry() {
    echo -e "${BLUE}-------------------------------------------------------"
    echo -e "${BLUE}Removing entry from /etc/hosts"
    sudo sed -i'' -e '/127\.0\.0\.1\s\+id\.auctionservice\.com\s\+app\.auctionservice\.com\s\+api\.auctionservice\.com/d' /etc/hosts
    if grep -qE '^\s*127\.0\.0\.1\s+id\.auctionservice\.com\s+app\.auctionservice\.com\s+api\.auctionservice\.com\s*$' /etc/hosts;
    then
      echo -e "${RED}Fail to remove! Please check /etc/host"
    else
      echo -e "${GREEN}Entry removed successfully!"
    fi
    echo -e "${BLUE}-------------------------------------------------------"
}

# Function to print contents of hosts file
print_hosts_file() {
    echo -e "${BLUE}-------------------------------------------------------"
    echo -e "${BLUE}Contents of /etc/hosts:"
    sudo cat /etc/hosts
    echo -e "${BLUE}-------------------------------------------------------"
}

# Display options to the user
display_options() {
    echo -e "${BLUE}Please select an option:"
    echo -e "1. Add entry"
    echo -e "2. Remove entry"
    echo -e "3. Print hosts file"
    echo -e "4. Exit"
    echo -e "${BLUE}-------------------------------------------------------"
}

# Main function
main() {
    while true; do
        display_options
        read -p "$(echo -e ${RED}"Enter your choice: "${NORMAL})" choice
        case $choice in
            1) add_entry ;;
            2) remove_entry ;;
            3) print_hosts_file ;;
            4) echo -e "${GREEN}Exiting..."; break ;;
            *) echo -e "${RED}Invalid option. Please enter a valid number." ;;
        esac
    done
}

# Execute the main function
main