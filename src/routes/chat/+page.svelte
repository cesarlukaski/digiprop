<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Mock data for chat users
    const chatUsers = [
        {
            id: 1,
            name: "Pathum",
            lastMessage: "Hey there!",
            time: "2:30 pm",
            avatar: "/avatar.png",
            online: true,
        },
        {
            id: 2,
            name: "Chanaka",
            lastMessage: "Hi",
            time: "1:45 pm",
            avatar: "/avatar.png",
            online: false,
        },
        {
            id: 3,
            name: "Prageeth",
            lastMessage: "Good morning",
            time: "11:20 am",
            avatar: "/avatar.png",
            online: true,
        },
        {
            id: 4,
            name: "AJ",
            lastMessage:
                "Hey Pathum, can you please review the latest design when you can?",
            time: "10:05 am",
            avatar: "/avatar.png",
            online: true,
        },
        {
            id: 5,
            name: "Charaka",
            lastMessage: "Hi",
            time: "9:30 am",
            avatar: "/avatar.png",
            online: false,
        },
    ];

    // Mock data for current conversation
    const conversation = [
        {
            id: 1,
            sender: "AJ",
            senderId: 4,
            message:
                "Hey Pathum, can you please review the latest design when you can?",
            time: "Friday 2:05pm",
            isCurrentUser: false,
            avatar: "/avatar.png",
        },
        {
            id: 2,
            sender: "You",
            senderId: 0,
            message:
                "Hey Pathum, can you please review the latest design when you can?",
            time: "Friday 2:06pm",
            isCurrentUser: true,
            avatar: "/avatar.png",
        },
        {
            id: 3,
            sender: "AJ",
            senderId: 4,
            message: "Latest design screenshot.jpg",
            time: "Friday 2:07pm",
            isCurrentUser: false,
            avatar: "/avatar.png",
            attachment: {
                type: "image",
                filename: "Latest design screenshot.jpg",
                size: "3.2 MB",
            },
        },
        {
            id: 4,
            sender: "You",
            senderId: 0,
            message: "Latest design screenshot.jpg",
            time: "Friday 2:09pm",
            isCurrentUser: true,
            avatar: "/avatar.png",
            attachment: {
                type: "image",
                filename: "Latest design screenshot.jpg",
                size: "3.2 MB",
            },
        },
    ];

    // Selected chat
    let selectedUser = chatUsers[3]; // AJ is selected by default

    // New message input
    let newMessage = "";

    // Send message function
    function sendMessage() {
        if (newMessage.trim() === "") return;

        // In a real app, this would send the message to the server
        console.log("Sending message:", newMessage);

        // Clear the input
        newMessage = "";
    }

    // Handle keydown events for message input
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    // Define a ChatUser type
    type ChatUser = {
        id: number;
        name: string;
        lastMessage: string;
        time: string;
        avatar: string;
        online: boolean;
    };

    // Select chat user
    function selectUser(user: ChatUser) {
        selectedUser = user;
    }

    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }
    });
</script>

<div class="chat-container">
    <!-- Chat List -->
    <div class="chat-list">
        <div class="chat-list-header">
            <h2>Chat</h2>
            <div class="online-indicator"></div>
        </div>

        <div class="chat-users">
            {#each chatUsers as user}
                <div
                    class="chat-user {selectedUser.id === user.id
                        ? 'selected'
                        : ''}"
                    on:click={() => selectUser(user)}
                >
                    <div class="user-avatar">
                        <img src={user.avatar} alt={user.name} />
                        {#if user.online}
                            <span class="online-dot"></span>
                        {/if}
                    </div>
                    <div class="user-info">
                        <div class="user-name">{user.name}</div>
                        <div class="last-message">{user.lastMessage}</div>
                    </div>
                    <div class="message-time">{user.time}</div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Chat Conversation -->
    <div class="chat-conversation">
        <div class="conversation-header">
            <div class="user-info">
                <div class="user-avatar">
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                    {#if selectedUser.online}
                        <span class="online-dot"></span>
                    {/if}
                </div>
                <div class="user-name">{selectedUser.name}</div>
            </div>

            <div class="conversation-actions">
                <button class="action-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </button>
            </div>
        </div>

        <div class="messages">
            {#each conversation as message}
                <div
                    class="message {message.isCurrentUser
                        ? 'outgoing'
                        : 'incoming'}"
                >
                    {#if !message.isCurrentUser}
                        <div class="message-avatar">
                            <img src={message.avatar} alt={message.sender} />
                        </div>
                    {/if}

                    <div class="message-content">
                        {#if message.attachment}
                            <div class="attachment">
                                <div class="attachment-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                                        ></path>
                                        <polyline points="13 2 13 9 20 9"
                                        ></polyline>
                                    </svg>
                                </div>
                                <div class="attachment-details">
                                    <div class="attachment-name">
                                        {message.attachment.filename}
                                    </div>
                                    <div class="attachment-size">
                                        {message.attachment.size}
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div class="message-text">{message.message}</div>
                        {/if}
                        <div class="message-time">{message.time}</div>
                    </div>

                    {#if message.isCurrentUser}
                        <div class="message-avatar">
                            <span class="you-label">You</span>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="message-input">
            <input
                type="text"
                placeholder="Type Here"
                bind:value={newMessage}
                on:keydown={handleKeydown}
            />
            <button class="send-button" on:click={sendMessage}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    </div>
</div>

<style>
    .chat-container {
        display: flex;
        height: 100vh;
        max-width: 1200px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
    }

    /* Chat list styles */
    .chat-list {
        width: 300px;
        border-right: 1px solid #eaeaea;
        display: flex;
        flex-direction: column;
    }

    .chat-list-header {
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eaeaea;
    }

    .chat-list-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
    }

    .online-indicator {
        width: 8px;
        height: 8px;
        background-color: #4caf50;
        border-radius: 50%;
        margin-left: 10px;
    }

    .chat-users {
        flex: 1;
        overflow-y: auto;
    }

    .chat-user {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        cursor: pointer;
        border-bottom: 1px solid #f5f5f5;
        transition: background-color 0.2s;
    }

    .chat-user:hover {
        background-color: #f9f9f9;
    }

    .chat-user.selected {
        background-color: #f0f0f0;
    }

    .user-avatar {
        position: relative;
        margin-right: 12px;
    }

    .user-avatar img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    .online-dot {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        background-color: #4caf50;
        border-radius: 50%;
        border: 2px solid #fff;
    }

    .user-info {
        flex: 1;
        overflow: hidden;
    }

    .user-name {
        font-weight: 500;
        margin-bottom: 4px;
    }

    .last-message {
        font-size: 12px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .message-time {
        font-size: 11px;
        color: #999;
        white-space: nowrap;
    }

    /* Chat conversation styles */
    .chat-conversation {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .conversation-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        border-bottom: 1px solid #eaeaea;
    }

    .conversation-header .user-info {
        display: flex;
        align-items: center;
    }

    .conversation-header .user-name {
        font-weight: 600;
        margin: 0;
    }

    .conversation-actions {
        display: flex;
    }

    .action-button {
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
        padding: 5px;
    }

    .messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background-color: #f9f9f9;
    }

    .message {
        display: flex;
        margin-bottom: 20px;
        align-items: flex-start;
    }

    .message.incoming {
        justify-content: flex-start;
    }

    .message.outgoing {
        justify-content: flex-end;
    }

    .message-avatar {
        margin: 0 10px;
    }

    .message-avatar img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .you-label {
        font-size: 12px;
        color: #666;
    }

    .message-content {
        max-width: 60%;
        padding: 10px 15px;
        border-radius: 18px;
        position: relative;
    }

    .incoming .message-content {
        background-color: #e6e6e6;
        border-bottom-left-radius: 4px;
    }

    .outgoing .message-content {
        background-color: #000;
        color: white;
        border-bottom-right-radius: 4px;
    }

    .message-text {
        word-wrap: break-word;
    }

    .message-time {
        font-size: 10px;
        color: #999;
        text-align: right;
        margin-top: 5px;
    }

    .outgoing .message-time {
        color: #ccc;
    }

    .attachment {
        display: flex;
        align-items: center;
        padding: 5px;
    }

    .attachment-icon {
        margin-right: 10px;
    }

    .attachment-details {
        flex: 1;
    }

    .attachment-name {
        font-weight: 500;
    }

    .attachment-size {
        font-size: 11px;
        color: #999;
    }

    .outgoing .attachment-size {
        color: #ccc;
    }

    .message-input {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        background-color: #fff;
        border-top: 1px solid #eaeaea;
    }

    .message-input input {
        flex: 1;
        border: none;
        padding: 10px;
        border-radius: 20px;
        background-color: #f0f0f0;
        outline: none;
    }

    .send-button {
        background: none;
        border: none;
        cursor: pointer;
        margin-left: 10px;
        color: #000;
    }

    @media (max-width: 992px) {
        .chat-list {
            width: 250px;
        }
    }

    @media (max-width: 768px) {
        .chat-list {
            width: 100%;
            display: none;
        }

        .chat-container.show-list .chat-list {
            display: block;
        }

        .chat-container.show-list .chat-conversation {
            display: none;
        }
    }
</style>
