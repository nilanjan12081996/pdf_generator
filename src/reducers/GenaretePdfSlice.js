import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dummyPdfData } from "../Constants/pdfDummyData";


const API_URL = "https://api.pdfmonkey.io/api/v1";
const API_KEY = import.meta.env.VITE_PDFMONKEY_API_KEY;;

export const generatePDF = createAsyncThunk(
    "pdf/generate",
    async (templateId, { rejectWithValue }) => {
        try {
            const payload = {
                document_template_id: templateId,
                status: "pending",
                payload: dummyPdfData,
            };

            const response = await axios.post(
                `${API_URL}/documents`,
                { document: payload },
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


const initialState = {
    loading: false,
    documentId: null,
    downloadUrl: null,
    status: null,
    error: null,
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
                state.documentId = payload.id;
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
            });
    },
});

export const { resetPdfState } = GenaretePdfSlice.actions;

export default GenaretePdfSlice.reducer;
