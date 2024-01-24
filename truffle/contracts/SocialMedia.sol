// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SocialMedia {
    struct User {
        address userAddress;
        string name;
    }

    struct Post {
        uint256 id;
        string text;
        string[] tags;
        string gif;
        address[] mentions;
        uint256 timestamp;
        Comment[] comments;
        uint256[] reactions;
    }

    struct Comment {
        uint256 id;
        uint256 timestamp;
        string text;
        uint256[] reactions;
        uint256 replyTo; // ID of the post or comment being replied to
    }

    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;

    uint256 public postCount;

    event PostCreated(uint256 indexed postId, address indexed userAddress, string text, string[] tags, string gif, address[] mentions, uint256 timestamp);
    event CommentAdded(uint256 indexed postId, uint256 indexed commentId, address indexed userAddress, string text);

    function isRegistered() public view returns (bool) {
        return users[msg.sender].userAddress != address(0);
    }

    function createUser(string memory _name) public {
        require(users[msg.sender].userAddress == address(0), "User already exists");
        
        users[msg.sender] = User(msg.sender, _name);
    }

    function createPost(string memory _text, string[] memory _tags, string memory _gif, address[] memory _mentions) public {
        require(bytes(_text).length > 0, "Post text cannot be empty");

        postCount++;

        Post storage newPost = posts[postCount];
        newPost.id = postCount;
        newPost.text = _text;
        newPost.tags = _tags;
        newPost.gif = _gif;
        newPost.mentions = _mentions;
        newPost.timestamp = block.timestamp;

        emit PostCreated(postCount, msg.sender, _text, _tags, _gif, _mentions, block.timestamp);
    }

    function addComment(uint256 _postId, string memory _text, uint256 _replyTo) public {
        require(_postId <= postCount, "Invalid post ID");
        require(bytes(_text).length > 0, "Comment text cannot be empty");

        Post storage post = posts[_postId];
        uint256 commentId = post.comments.length + 1;

        Comment memory newComment = Comment({
            id: commentId,
            timestamp: block.timestamp,
            text: _text,
            reactions: new uint256[](0),
            replyTo: _replyTo
        });

        post.comments.push(newComment);

        emit CommentAdded(_postId, commentId, msg.sender, _text);
    }

    function getPost(uint256 _postId) public view returns (
        uint256 id,
        string memory text,
        string[] memory tags,
        string memory gif,
        address[] memory mentions,
        uint256 timestamp,
        Comment[] memory comments,
        uint256[] memory reactions
    ) {
        require(_postId <= postCount, "Invalid post ID");

        Post storage post = posts[_postId];

        return (
            post.id,
            post.text,
            post.tags,
            post.gif,
            post.mentions,
            post.timestamp,
            post.comments,
            post.reactions
        );
    }
}
