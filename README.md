# Jira Ticket Clone Project:

1. Clean UI:

    - core CSS concepts

    - fully responsive desgin

        - desktop

        - tablet

        - mobile

2. DOM Method and properties:

3. Web Storage API:

    - Types of storage in browser

    - Differences

    - Local Storage API


4. Building the Project:

    - HTML CSS Structuring

    - Learn how to get Tailwind CSS up and running in your project.

        - https://tailwindcss.com/docs/installation#installing-tailwind-css-as-a-post-css-plugin

        - https://themesberg.com/knowledge-center/tailwind-css/html

        - https://dev.to/raphaelmansuy/how-to-add-tailwindcss-to-a-simple-html-project-446g

    - Font Awesome icons

        - Google Search: font awesome cdn link

            - https://cdnjs.com/libraries/font-awesome
        
        - font awesome icons

            - https://fontawesome.com/v5.15/icons?d=gallery&p=2&q=times

        - How do it center an absolutely positioned div element?

            - https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div

                    div {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                    }

5. DOM Implementation and Manipulation:

    - Modal functionality

        - modal ticket priority color

            - Add a functionality to select the priority color for a new modal ticket.

            - Applying priority coloring to a new modal ticket

                    (create the new modal ticket with the currently selected priority color)
        
        - Generating unique ticket id's for every new modal ticket

            - Google Search : short id unpkg script
            
                    https://www.npmjs.com/package/shortid-dist?activeTab=readme
        
        - Adding a ticket lock and unlock functionality

            - added a lock button to every new modal ticket

            - If the ticket is locked then unlock it when the user clicks on it, and if the ticket is unlocked then lock it again when the user clicks on it again.

            - if the ticket is locked then the user cannot edit the textarea contents, and if the ticket is unlocked then the user can 
            edit the text area contents.

                    contenteditable --> https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
        
        - Adding remove ticket functionality

            -  when the user clicks on the remove button for the first time the ticket remove functionality should enable and when the user again clicks on the remove button then the ticket remove functionality should disable.

            - handle ticket removal
            
                    If the ticket remove functionality is enabled then remove the modal ticket on which the user double clicks.
        
        - Update the ticket task with the text area value

            - create a new modal ticket with the text area value that the use types in.
        
        - Change the modal ticket color priority

            - When the user clicks on the modal ticket color then it should change the color to the next priority color

                    arr.findIndex() --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        
        - Adding Ticket Filter functionality

            - When the user "clicks" on a particular color from toolbox colors then It should display only those tickets having that
            ticket color

            - When the user ""double clicks" on any color from toolbox colors then display all tickets.

            - Handle duplicity problem in ticket filter functionality
        
        - After creating a new ticket ---> reset modal to default state

6. Web Storage API:

    - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

    - It is provided by the browser.

    - It is a set of mechanisms for porviding storage in the form of key value pairs (objects).

    - Types Of storage in browser:

        - Local Storage
                - Expiry: data persists even after closing the browser

                - Storage: almost 5 MB

        - Session Storage

                - Expiry: Only available for that particular session (browser close, refresh site)

                - Less Storage
    
    - stored data is always in key-value pairs which should be a string i.e JSON format.

7. JSON Format:

    - JSON.stringify()

    - JSON.parse()

8. Using Local Storage in our website:

    - Create Tickets

    - Changing priority colors

    - Ticket task edit

    - Tickets removal


    
