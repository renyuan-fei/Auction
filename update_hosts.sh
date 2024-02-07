#!/bin/bash

# Function to add entry to hosts file
add_entry() {
    echo "-------------------------------------------------------"
    echo "Checking if entry already exists..."
    if grep -qE '^\s*127\.0\.0\.1\s+id\.carsties\.com\s*$' /etc/hosts; then
        echo "Entry already exists in /etc/hosts. Aborting."
        echo "-------------------------------------------------------"
    else
        echo "Adding entry to /etc/hosts"
        echo "127.0.0.1 id.carsties.com" | sudo tee -a /etc/hosts > /dev/null
        echo "Entry added successfully!"
        echo "-------------------------------------------------------"
    fi
}


# Function to remove entry from hosts file
remove_entry() {
    echo "-------------------------------------------------------"
    echo "Removing entry from /etc/hosts"
    echo "-------------------------------------------------------"
    sudo sed -i -e '\#^127\.0\.0\.1[[:space:]]id\.carsties\.com$#d' /etc/hosts
}



# Function to print contents of hosts file
print_hosts_file() {
    echo "-------------------------------------------------------"
    echo "Contents of /etc/hosts:"
    echo "-------------------------------------------------------"
    cat /etc/hosts
    echo "-------------------------------------------------------"
}

# Display options to the user
display_options() {
    echo "-------------------------------------------------------"
    echo "Please select an option:"
    echo "1. Add entry"
    echo "2. Remove entry"
    echo "3. Print hosts file"
    echo "4. Exit"
    echo "-------------------------------------------------------"
}

# Main function
main() {
    while true; do
        display_options
        echo
        read -p "Enter your choice: " choice

        case $choice in
            1)
                add_entry
                ;;
            2)
                remove_entry
                ;;
            3)
                print_hosts_file
                ;;
            4)
                echo "Exiting..."
                break
                ;;
            *)
                echo "Invalid option. Please enter a valid option."
                ;;
        esac
    done
}

# Execute the main function
main
