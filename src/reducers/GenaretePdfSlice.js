import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dummyPdfData } from "../Constants/pdfDummyData";
import api from "../stores/api";


const API_URL = "https://api.pdfmonkey.io/api/v1";
const API_KEY = import.meta.env.VITE_PDFMONKEY_API_KEY;;

export const generatePDF = createAsyncThunk(
    "pdf/generate",
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/documents`,userInput,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data.document;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to generate PDF");
        }
    }
);


export const checkPdfStatus = createAsyncThunk(
    "pdf/status",
    async (documentId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/documents/${documentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );


            return response.data.document;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to check status");
        }
    }
);

// export const reportGenerate=createAsyncThunk(
//     "reportGenerate",
//      async (userInput, { rejectWithValue }) => {
//         try {
//             const response = await api.post(`api/analytics/get-analytics`,userInput);


//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to check status");
//         }
//     }
// )


export const reportGenerate = createAsyncThunk(
  'reportGenerate',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('api/analytics/get-analytics',userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const historyGenerate = createAsyncThunk(
  'historyGenerate',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('api/analytics/add-history',userInput);
      if (response?.data?.status_code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);



const initialState = {
    loading: false,
    documentId: null,
    downloadUrl: null,
    status: null,
    error: null,
    reportData:[],
    hist:""
};


const GenaretePdfSlice = createSlice({
    name: "generatePdf",
    initialState,
    reducers: {
        resetPdfState: (state) => {
            state.loading = false;
            state.error = null;
            state.downloadUrl = null;
            state.documentId = null;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(generatePDF.pending, (state) => {
                state.loading = true;
            })
            .addCase(generatePDF.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.documentId = payload;
            })
            .addCase(generatePDF.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            .addCase(checkPdfStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkPdfStatus.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.status = payload.status;

                if (payload.download_url) {
                    state.downloadUrl = payload.download_url;
                }
            })
            .addCase(checkPdfStatus.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(reportGenerate.pending,(state)=>{
                state.loading=true
                
            })
            .addCase(reportGenerate.fulfilled,(state,{payload})=>{
                state.loading=false
                state.reportData=payload
                state.error=false
            })
            .addCase(reportGenerate.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
                .addCase(historyGenerate.pending,(state)=>{
                state.loading=true
                
            })
            .addCase(historyGenerate.fulfilled,(state,{payload})=>{
                state.loading=false
                state.hist=payload
                state.error=false
            })
            .addCase(historyGenerate.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            ;
    },
});

export const { resetPdfState } = GenaretePdfSlice.actions;

export default GenaretePdfSlice.reducer;
