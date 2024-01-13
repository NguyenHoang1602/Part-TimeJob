const config = {
    screens: {
        WelcomeScreen: {
            path : 'welcome',
        },
        ApplicationsStack: {
            path : 'apply',
        },
        NotificationScreen : {
            path : 'notification',
        },
        CurriculumVitaeScreen : {
            path : 'vitae',
        }
    },
};

const linking = {
    prefixes: ['parttimejob://app'],
    config,
};

export default linking;