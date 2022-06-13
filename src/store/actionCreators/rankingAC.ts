import { RankingAction, RankingActionTypes } from "../../types/rankingTypes"
import { Dispatch } from "redux"
import axios from "axios"
import { devID } from "../../DAL/indexAPI"
import { signature, signatureDI, signatureAPI } from "../../lib/signature"
import { resDate } from "../../lib/date"

export const rankingFetchBestPlayers = (sessionId: string) => {
    return async (dispatch: Dispatch<RankingAction>) => {
        try {
            dispatch({type: RankingActionTypes.FETCH_BEST_PLAYERS})
            const response = await axios.get(`https://PaladinsPlayerFund.eich1cyfaill.repl.co/getrankinglist?signature=${signature(signatureDI, "getleagueleaderboard", signatureAPI, resDate())}&si=${sessionId}&resDate=${resDate()}`)
            const responseSliced = response.data.slice(0, 50)
            dispatch({type: RankingActionTypes.FETCH_BEST_PLAYERS_SUCCESS, payload: responseSliced})
        } catch (e) {
            console.error('Error Ranking List')
        }
    }
}