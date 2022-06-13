import { Dispatch } from "redux"
import { PlayerInfoAction, PlayerInfoTypes } from "../../types/playerInfoTypes"
import axios from "axios"
import { signatureDI, signature, signatureAPI } from "../../lib/signature"
import { resDate } from "../../lib/date"
import { totalWinrateFractions } from "../../lib/totalWinrateFractions"

export const acGetPlayer = (name: string | undefined, sessionID: string) => {
    return async (dispatch: Dispatch<PlayerInfoAction>) => {
        try {
            dispatch({type: PlayerInfoTypes.FETCH_PLAYER})
            const response = await axios.get(`https://PaladinsPlayerFund.eich1cyfaill.repl.co/getplayer?signature=${signature(signatureDI, "getplayer", signatureAPI, resDate())}&si=${sessionID}&resDate=${resDate()}&name=${name}`)
            totalWinrateFractions(response.data[0].Wins, response.data[0].Losses, response.data[0].RankedKBM.Wins, response.data[0].RankedKBM.Losses)
            dispatch({type: PlayerInfoTypes.FETCH_PLAYER_SUCCESS, payload: response.data[0]})
        } catch (e) {
            dispatch({type: PlayerInfoTypes.FETCH_PLAYER_ERROR})
        }
    }
}

export const acGetPlayerChampionRanks = (name: string | undefined, sessionID: string) => {
    return async (dispatch: Dispatch<PlayerInfoAction>) => {
        try {
            dispatch({type: PlayerInfoTypes.FETCH_PLAYER_CHAMPION_RANKS})
            const response = await axios.get(`https://PaladinsPlayerFund.eich1cyfaill.repl.co/getchampionranks?signature=${signature(signatureDI, "getchampionranks", signatureAPI, resDate())}&si=${sessionID}&resDate=${resDate()}&name=${name}`)
            const responseBatch = response.data.slice(0, 5)
            await dispatch({type: PlayerInfoTypes.FETCH_PLAYER_CHAMPION_RANKS_SUCCESS, payload: response.data})
            dispatch({type: PlayerInfoTypes.FETCH_PLAYER_CHAMPION_RANKS_BATCH, payload: responseBatch})
        } catch (e) {
            dispatch({type: PlayerInfoTypes.FETCH_PLAYER_CHAMPION_RANKS_ERROR, payload: 'ERROR GET CHAMPION RANKS'})
        }
    }
}

export const acGetPlayerStatus = (name: string | undefined, sessionID: string) => {
    return async (dispatch: Dispatch<PlayerInfoAction>) => {
        try {
            const response = await axios.get(`https://PaladinsPlayerFund.eich1cyfaill.repl.co/getplayerstatus?signature=${signature(signatureDI, "getplayerstatus", signatureAPI, resDate())}&si=${sessionID}&resDate=${resDate()}&name=${name}`)
            await dispatch({type: PlayerInfoTypes.GET_PLAYER_STATUS, payload: response.data[0].status})
            await dispatch({type: PlayerInfoTypes.GET_PLAYER_STATUS_DESC, payload: response.data[0].status_string})
            dispatch({type: PlayerInfoTypes.GET_PLAYER_STATUS_SUCCESS})
        } catch (e) {
            console.error('ERROR_STATUS_100')
        }
    }
}

export const acGetMatchHistory = (name: string | undefined, sessionID: string) => {
    return async (dispatch: Dispatch<PlayerInfoAction>) => {
        try {
            dispatch({type: PlayerInfoTypes.GET_PLAYER_MATCH_HISTORY})
            const response = await axios.get(`https://PaladinsPlayerFund.eich1cyfaill.repl.co/getmatchhistory?signature=${signature(signatureDI, "getmatchhistory", signatureAPI, resDate())}&si=${sessionID}&resDate=${resDate()}&name=${name}`)
            dispatch({type: PlayerInfoTypes.GET_PLAYER_MATCH_HISTORY_SUCCESS, payload: response.data})
        } catch(e) {
            console.error('ERROR_STATUS_101')
        }
    }
}

export const acFetchCurrentPickedMatchId = (matchId: number) => {
    return (dispatch: Dispatch<PlayerInfoAction>) => {
        dispatch({type: PlayerInfoTypes.FETCH_CURRENT_PICKED_MATCH_ID, payload: matchId})
    }
}

export const playerInfoUnmountPlayerNotFound = () => {
    return (dispatch: Dispatch<PlayerInfoAction>) => {
        dispatch({type: PlayerInfoTypes.UNMOUNT_PLAYER_NOT_FOUND})
    }
}