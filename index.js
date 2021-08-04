const axios = require('axios')
const cheerio = require('cheerio')
// Replace the url with your url
const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        // If you replaced the url above then you have to also replace these .statsTableContainer with the class of the div
        const statsTable = $('.statsTableContainer > tr')
        const statsData = []

        statsTable.each(function() {
            // If you replaced the url then you have to replace these too
            const rank = $(this).find('.rank > strong').text()
            const playerName = $(this).find('.playerName > strong').text()
            const nationality = $(this).find('.playerCountry').text()
            const mainStat = $(this).find('.mainStat').text()
            statsData.push({
                rank,
                playerName,
                nationality,
                mainStat
            })
        })
        // Will print the collected data
        console.log(statsData)
    })
    // In case of any error it will print the error
    .catch(console.error)