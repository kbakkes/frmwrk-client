function composeMessage(sollicitatie, avatar){
    return([
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "We hebben een nieuwe sollicitatie ontvangen! :gem: :tada:"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Great to see you here! App helps you to stay up-to-date with your meetings and events right here within Slack. These are just a few things which you will be able to do:"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "• Schedule meetings \n • Manage and update attendees \n • Get notified about changes of your meetings"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "But before you can do all these amazing things, we need you to connect your calendar to App. Simply click the button below:"
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Connect account",
                        "emoji": true
                    },
                    "value": "click_me_123"
                }
            ]
        }
    ])
}


export default composeMessage;