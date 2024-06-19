export const fakeVideo = {
    id: '1',
    snippet: {
        title: 'title',
        channelId: '1',
        thumbnails: {
            medium: {
                url: 'http://image/',
            },
        },
        channelTitle: 'channelTitle',
        publishedAt: new Date().toString(),
    },
};

export const fakeVideos = [
    {
        id: '1',
        snippet: {
            title: 'title',
            channelId: '1',
            thumbnails: {
                medium: {
                    url: 'http://image/',
                },
            },
            channelTitle: 'channelTitle',
            publishedAt: new Date().toString(),
        },
    },
    {
        id: '2',
        snippet: {
            title: 'title2',
            channelId: '2',
            thumbnails: {
                medium: {
                    url: 'http://image2/',
                },
            },
            channelTitle: 'channelTitle2',
            publishedAt: new Date().toString(),
        },
    }
]