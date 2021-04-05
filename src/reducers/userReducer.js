import  { BAND_VAK, CLEAR_BUPDATES, GET_BANDISH, GET_BANDLIK, GET_BMTABLE, GET_BOSHISH, GET_BOSHISHTABLE, GET_BOSHVAK, GET_BOSHVAK_SONI, GET_DISTSHAHS, GET_DISTVILS, GET_HISOBOT, GET_ISH_VALUES, GET_MBIT, GET_MUTA, GET_MUTADIST, GET_SHAHS, GET_TASDIQ, GET_TASHNOMI, GET_VILS, SET_AUTHLOADING, SET_BID, SET_BUpdates, SET_CURRENT_BIT, SET_ISH_VALUES, SET_LAVOZIM, SET_MLOAD, SET_TALIM, SET_USER, SET_VUpdates, SET_XLX, SET_YIL } from '../actions/types.js';

const initialScale = {
    vils: null,
    user: null,
    authLoading: false,
    shahs: null,
    muta: null,
    loading: false,
    yil: 2020,
    talim: null,
    bandlik: null,
    boshvak_soni: null,
    bandvak: [],
    lavozim: null,
    curBit: null,
    MBit: {
        boshvak: {
            loading: false,
            data: [],
            pagination: {
            current: 1,
            pageSize: 5,
             }
        },
        MBTable: null,
        tashnomi: [],
        boshishtable: {
            loading: false,
            data: [],
            pagination: {
            current: 1,
            pageSize: 5,
             }
        },
        BUpdates: [],
        VUpdates: [],
        ishValues: {
            nomi: "",
            yonalish:'',
            buyruq: "",
            lavozim: null,
            tel: '+998',
            manzil: null,
            izoh: null,
            vakansiya_id: null,
            file: null
        },
        Xlx: null,
        hisobot: [],
        data: [],
        pagination: {
            current: 1,
            pageSize: 25,
        },
        loading: false,
        vildist: null,
        shahdist: null,
        mutadist:null,
        boshish:{
            loading: false,
            data: [],
            pagination: {
            current: 1,
            pageSize: 25,
        },
        
        },

        bandish:{
            loading: false,
            data: [],
            pagination: {
            current: 1,
            pageSize: 25,
        },
        
        },

        tasdiq:{
            loading: false,
            data: [],
            pagination: {
            current: 1,
            pageSize: 25,
        },
        
        }
    }
}

export default (state = initialScale, action) => {
    switch(action.type) {
        case GET_VILS:
            return {
                ...state,
                vils: action.payload
            }
            
            case GET_SHAHS:
                return {
                    ...state,
                    shahs: action.payload
                }
                case SET_USER:
                    return {
                        ...state,
                        user: action.payload
                    }
                case GET_MUTA:
                return {
                    ...state,
                    muta: action.payload
                }
                case SET_YIL:
                    return {
                        ...state,
                        yil: action.payload
                    }

                 case GET_BANDLIK:
                return {
                    ...state,
                    bandlik: action.payload
                }
                case BAND_VAK:
                    return {
                        ...state,
                        bandvak: action.payload
                    }
                case GET_BOSHVAK_SONI:
                    return {
                        ...state,
                        boshvak_soni: action.payload
                    }
                case SET_XLX:
                    return {
                        ...state,   
                        MBit: {
                            ...state.MBit,
                            Xlx: action.payload
                        }
                    }  
                case SET_LAVOZIM:
                    return {
                        ...state,
                        lavozim: action.payload
                    }
                    
                case SET_AUTHLOADING:
                        return {
                            ...state,
                            authLoading: action.payload
                        }        
                case SET_CURRENT_BIT:
                return {
                         ...state,
                        curBit: action.payload
                } 
                case SET_TALIM:
                return {
                         ...state,
                        talim: action.payload
                } 
        case GET_MBIT:
            return {
                    ...state,
                    MBit: {
                        ...state.MBit,
                        ...action.payload
                    }
            }
            case SET_BID:
                return {
                        ...state,
                        MBit: {
                            ...state.MBit,
                           BId: action.payload
                        }
                }
                case GET_TASHNOMI:
                    return {
                            ...state,
                            MBit: {
                                ...state.MBit,
                               tashnomi: action.payload
                            }
                    }         
                case SET_BUpdates:
                    return {
                            ...state,
                            MBit: {
                                ...state.MBit,
                               BUpdates: [...state.MBit.BUpdates, action.payload]
                            }
                    }

                    case SET_VUpdates:
                        return {
                                ...state,
                                MBit: {
                                    ...state.MBit,
                                   VUpdates: [...state.MBit.VUpdates, action.payload]
                                }
                        }
                    
                    case CLEAR_BUPDATES:
                        return {
                                ...state,
                                MBit: {
                                    ...state.MBit,
                                   BUpdates: []
                                }
                        }         
            case GET_BOSHISH:
                return {
                        ...state,
                        MBit: {
                            ...state.MBit,
                            boshish: action.payload
                        }
                }
                case GET_BOSHISHTABLE:
                    return {
                            ...state,
                            MBit: {
                                ...state.MBit,
                                boshishtable: action.payload
                            }
                    }    
                case GET_BANDISH:
                    return {
                            ...state,
                            MBit: {
                                ...state.MBit,
                                bandish: action.payload
                            }
                    }  
                    case GET_HISOBOT:
                        return {
                                ...state,
                                MBit: {
                                    ...state.MBit,
                                    hisobot: action.payload
                                }
                        }         
                    case GET_TASDIQ:
                        return {
                                ...state,
                                MBit: {
                                    ...state.MBit,
                                    tasdiq: action.payload
                                }
                        }         
            case SET_MLOAD:
                return {
                        ...state,
                        loading: action.payload
                        }

                case GET_DISTVILS:
                    return {
                            ...state,
                            MBit: {
                                ...state.MBit,
                                vildist: action.payload
                            }
                    } 
                    
                    case GET_DISTSHAHS:
                        return {
                                ...state,
                                MBit: {
                                    ...state.MBit,
                                    shahdist: action.payload
                                }
                        } 

                        case GET_BOSHVAK:
                            return {
                                    ...state,
                                    MBit: {
                                        ...state.MBit,
                                        boshvak: action.payload
                                    }
                            }        
                        
                        case GET_MUTADIST:
                            return {
                                    ...state,
                                    MBit: {
                                        ...state.MBit,
                                        mutadist: action.payload
                                    }
                            }          
                case SET_ISH_VALUES:
                    return {
                            ...state,
                            MBit: {
                                ...state.MBit,
                                ishValues: action.payload
                            }
                    }
                    case GET_ISH_VALUES:
                        return {
                                ...state,
                                MBit: {
                                    ...state.MBit,
                                    ishValues: action.payload
                                }
                        } 
                    case GET_BMTABLE:
                        return {
                                ...state,
                                MBit: { 
                                    ...state.MBit,
                                    MBTable: action.payload
                                }
                        }                   
        default: 
            return state;
    }
}