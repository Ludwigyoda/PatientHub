const NewsService = {
    getRegionalNews: async (region = 'Général') => {
        // Pour la V1, on renvoie des news "hardcodées" simulant une API régionale
        return [
            {
                id: 1,
                title: "Campagne de vaccination",
                content: "La campagne de vaccination grippe commence dans votre région.",
                type: "ALERT",
                region: region,
                createdAt: new Date()
            },
            {
                id: 2,
                title: "Nouveau centre de soins",
                content: "Un nouveau centre de santé de proximité a ouvert ses portes.",
                type: "INFO",
                region: region,
                createdAt: new Date()
            },
            {
                id: 3,
                title: "Pollu-Check",
                content: "Pic de pollution prévu demain. Limitez les activités physiques en extérieur.",
                type: "WARNING",
                region: region,
                createdAt: new Date()
            }
        ];
    }
};

export default NewsService;
