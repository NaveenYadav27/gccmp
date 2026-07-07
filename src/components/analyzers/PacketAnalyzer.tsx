import React, { useState, useRef } from "react";
import { Terminal, Upload, FileText, Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzePacket } from "@/lib/packet-analyzer.functions";
import ReactMarkdown from "react-markdown";

export function PacketAnalyzer() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setText(""); // clear text if file is uploaded
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim() && !file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (file) {
        // Read file to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const resultBase64 = (e.target?.result as string).split(",")[1];
            const isBinary =
              file.name.endsWith(".pcap") ||
              file.name.endsWith(".pcapng") ||
              file.name.endsWith(".evtx");

            const res = await analyzePacket({
              data: {
                filename: file.name,
                content: isBinary ? resultBase64 : atob(resultBase64),
                type: isBinary ? "binary" : "text",
              },
            });
            setResult(res.result);
          } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to analyze file");
          } finally {
            setLoading(false);
          }
        };
        reader.onerror = () => {
          setError("Failed to read file");
          setLoading(false);
        };
        reader.readAsDataURL(file); // Base64 encoding handles both binary and text nicely over JSON
      } else {
        const res = await analyzePacket({
          data: {
            filename: "paste.txt",
            content: text,
            type: "text",
          },
        });
        setResult(res.result);
        setLoading(false);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to analyze");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-cyber" />
          <h3 className="font-semibold text-lg">AI Packet & Log Analyzer</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col space-y-4">
          <div className="bg-surface-1 border border-border/50 rounded-xl p-4 flex-1 flex flex-col">
            <p className="text-sm font-medium mb-3">Input Data</p>

            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pcap,.pcapng,.log,.evtx,.json,.csv,.txt"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                className="w-full justify-start text-muted-foreground border-dashed"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {file ? file.name : "Upload .pcap, .log, .evtx, .csv"}
              </Button>
            </div>

            <div className="relative flex-1 flex flex-col">
              <Textarea
                className="flex-1 resize-none bg-background/50 border-border/50 font-mono text-xs p-3 h-[200px]"
                placeholder="Or paste your raw logs / packets here..."
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (file) setFile(null); // clear file if they start typing
                }}
              />
            </div>

            <Button
              className="mt-4 cyber-gradient text-cyber-foreground w-full"
              onClick={handleAnalyze}
              disabled={loading || (!text.trim() && !file)}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {loading ? "Analyzing via TShark & AI..." : "Analyze"}
            </Button>
          </div>
        </div>

        <div className="bg-surface-1 border border-border/50 rounded-xl p-4 flex flex-col h-[400px] md:h-auto overflow-y-auto relative group">
          <p className="text-sm font-medium mb-3 sticky top-0 bg-surface-1 py-1 z-10 flex items-center justify-between">
            <span>Analysis Output</span>
            {result && (
              <span className="text-[10px] text-success border border-success/50 bg-success/10 px-2 py-0.5 rounded">
                Analysis Complete
              </span>
            )}
          </p>

          <div className="flex-1 text-sm text-muted-foreground prose prose-invert prose-p:leading-relaxed prose-pre:bg-background/80 max-w-none">
            {!result && !error && !loading && (
              <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-4 pt-10">
                <FileText className="h-12 w-12" />
                <p>Waiting for data input...</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 pt-10">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-t-2 border-cyber animate-spin"></div>
                  <Terminal className="absolute inset-0 m-auto h-5 w-5 text-cyber animate-pulse" />
                </div>
                <p className="text-xs text-cyber animate-pulse">
                  Running PCAP Parsers and AI heuristics...
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-danger/10 border border-danger/40 rounded-lg text-danger">
                <div className="flex items-center gap-2 mb-2 font-bold">
                  <AlertCircle className="h-4 w-4" />
                  Analysis Error
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap">{error}</pre>
              </div>
            )}

            {result && (
              <div className="animate-fade-in-up">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
