"use client";

import React, { useState, useEffect, useRef } from "react";
import User from "@/models/user.model";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BotIcon, Send, X } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyseClientProps {
  serverData: {
    data?: User;
    status: number;
    error?: string;
  };
}
interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Analyse({ serverData }: AnalyseClientProps) {
  const userData: User | null = serverData.data || null;
  const hasError: string | null = serverData.error || null;
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your financial assistant. How can I help you understand your financial data today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (chatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const userQuery = message;
    setMessage("");

    const loadingMessage: Message = {
      text: "Thinking...",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: userQuery }),
      });

      setMessages((prev) => prev.filter((msg) => msg.text !== "Thinking..."));

      if (response.status === 200) {
        const data = await response.json();

        const aiMessage: Message = {
          text:
            data.message ||
            "Sorry, I couldn't process your request at this time.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiMessage: Message = {
          text: "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.text !== "Thinking..."));

      console.error("Error communicating with chat API:", error);
      const aiMessage: Message = {
        text: "Sorry, there was a problem connecting to the chat service. Please check your connection and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (hasError) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-slate-50">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h2 className="text-xl font-medium text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{hasError}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-slate-50">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h2 className="text-xl font-medium text-red-600 mb-2">
            Unable to load data
          </h2>
          <p className="text-gray-600">
            We couldn't retrieve the borrower information. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  const { account_info, transactions } = userData;

  interface MonthlyDataEntry {
    credits: number;
    debits: number;
  }

  interface MonthlyDataMap {
    [key: string]: MonthlyDataEntry;
  }

  const monthlyData: MonthlyDataMap = transactions.reduce(
    (acc: MonthlyDataMap, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { credits: 0, debits: 0 };
      }

      if (transaction.credit_amount) {
        acc[monthYear].credits += transaction.credit_amount;
      }

      if (transaction.debit_amount) {
        acc[monthYear].debits += transaction.debit_amount;
      }

      return acc;
    },
    {}
  );

  const months = Object.keys(monthlyData);
  const creditData = months.map((month) => monthlyData[month].credits);
  const debitData = months.map((month) => monthlyData[month].debits);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Credits",
        data: creditData,
        backgroundColor: "rgba(16, 185, 129, 0.7)", // Emerald color
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
      },
      {
        label: "Debits",
        data: debitData,
        backgroundColor: "rgba(239, 68, 68, 0.7)", // Red color
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Credits vs Debits",
      },
    },
  };

  const totalCredits = transactions
    .filter((txn) => txn.credit_amount)
    .reduce((acc, txn) => acc + txn.credit_amount!, 0);

  const totalDebits = transactions
    .filter((txn) => txn.debit_amount)
    .reduce((acc, txn) => acc + txn.debit_amount!, 0);

  const startDate = new Date(account_info.period_start_date!);
  const endDate = new Date(account_info.period_end_date!);
  const daysInPeriod = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );
  const daysInMonth = 30; // average days in a month
  const monthsInPeriod = daysInPeriod / daysInMonth;

  const avgMonthlyIncome = totalCredits / monthsInPeriod;
  const avgMonthlyDebt = totalDebits / monthsInPeriod;

  const dti = avgMonthlyDebt / (avgMonthlyIncome || 1); // avoid div by zero

  const cashflowTrend =
    account_info.ending_balance! > account_info.beginning_balance!
      ? "Positive"
      : "Negative";

  const redFlags = [];
  if (dti > 0.5) redFlags.push("High Debt-to-Income Ratio");
  if (transactions.some((txn) => txn.balance && txn.balance < 0)) {
    redFlags.push("Account Overdrafts Detected");
  }
  if (
    transactions.filter(
      (txn) =>
        txn.description && txn.description.toLowerCase().includes("bounce")
    ).length > 0
  )
    redFlags.push("Bounced Transactions");

  const repaymentPrediction =
    dti < 0.4 && cashflowTrend === "Positive" && redFlags.length === 0
      ? "High chance of repayment"
      : dti < 0.5
      ? "Moderate chance"
      : "Risky borrower";

  const dtiPercentage = (dti * 100).toFixed(1);
  const dtiLevel = dti < 0.3 ? "low" : dti < 0.5 ? "medium" : "high";

  const dtiColors = {
    low: "text-emerald-600 bg-emerald-50 border-emerald-200",
    medium: "text-amber-600 bg-amber-50 border-amber-200",
    high: "text-red-600 bg-red-50 border-red-200",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-10 right-10 flex items-center justify-center bg-black rounded-full shadow-lg p-4 hover:bg-gray-800 transition-colors z-20"
      >
        <BotIcon className="h-6 w-6 text-white mr-4" />
        <p className="text-white">AI Chat</p>
      </button>

      {chatOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-30 z-40"
          onClick={() => setChatOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-full md:w-96 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          chatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white">
          <div className="flex items-center gap-2">
            <BotIcon className="h-6 w-6" />
            <h2 className="font-medium text-lg">Financial Assistant</h2>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="p-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg py-2 px-4 ${
                  msg.isUser
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.isUser ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="p-4 border-t border-gray-200 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about your financial data..."
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <header className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Borrower Risk Analysis
          </h1>
          <p className="text-gray-500 mt-1">
            {account_info.account_holder_name || "Unknown borrower"} •{" "}
            {account_info.bank_name}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-2">
                  Account Summary
                </h2>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="font-semibold text-gray-800">
                    Statement Period:
                  </span>
                  <span className="px-2 py-1 rounded bg-gray-100 font-medium">
                    {account_info.period_start_date}
                  </span>
                  <span className="text-gray-500">-</span>
                  <span className="px-2 py-1 rounded bg-gray-100 font-medium">
                    {account_info.period_end_date}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Initial Balance</p>
                  <p className="text-lg font-medium">
                    ₹{account_info.beginning_balance?.toLocaleString()}
                  </p>
                </div>
                <div className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Closing Balance</p>
                  <p className="text-lg font-medium">
                    ₹{account_info.ending_balance?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Risk Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-600 font-medium">Debt-to-Income</h3>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${dtiColors[dtiLevel]}`}
                >
                  {dtiLevel === "low"
                    ? "Low Risk"
                    : dtiLevel === "medium"
                    ? "Medium Risk"
                    : "High Risk"}
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{dtiPercentage}%</span>
              </div>
              <div className="mt-4 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    dtiLevel === "low"
                      ? "bg-emerald-500"
                      : dtiLevel === "medium"
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(100, dti * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {dti < 0.3
                  ? "Healthy DTI ratio"
                  : dti < 0.5
                  ? "Borderline DTI ratio"
                  : "Concerning DTI ratio"}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-gray-600 font-medium mb-4">
                Cash Flow Trend
              </h3>
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    cashflowTrend === "Positive" ? "bg-emerald-50" : "bg-red-50"
                  }`}
                >
                  <span
                    className={`text-xl ${
                      cashflowTrend === "Positive"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {cashflowTrend === "Positive" ? "↑" : "↓"}
                  </span>
                </div>
                <div>
                  <p
                    className={`font-semibold ${
                      cashflowTrend === "Positive"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {cashflowTrend}
                  </p>
                  <p className="text-xs text-gray-500">
                    {cashflowTrend === "Positive"
                      ? "Increasing balance"
                      : "Decreasing balance"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-gray-600 font-medium mb-4">Risk Flags</h3>
              {redFlags.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-5 rounded-full bg-red-50 flex items-center justify-center">
                      <span className="text-red-500 text-xs font-bold">
                        {redFlags.length}
                      </span>
                    </div>
                    <p className="text-red-600 font-medium">Issues detected</p>
                  </div>
                  <ul className="space-y-2">
                    {redFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-red-500 text-xs">⚠️</span>
                        <span className="text-sm text-gray-700">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <span className="text-emerald-500 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-600">All Clear</p>
                    <p className="text-xs text-gray-500">
                      No risk flags detected
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Repayment Prediction
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div
                className={`rounded-xl p-6 flex-1 ${
                  repaymentPrediction.includes("High")
                    ? "bg-emerald-50"
                    : repaymentPrediction.includes("Moderate")
                    ? "bg-amber-50"
                    : "bg-red-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      repaymentPrediction.includes("High")
                        ? "bg-emerald-100 text-emerald-600"
                        : repaymentPrediction.includes("Moderate")
                        ? "bg-amber-100 text-amber-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {repaymentPrediction.includes("High")
                      ? "✓"
                      : repaymentPrediction.includes("Moderate")
                      ? "!"
                      : "⚠️"}
                  </div>
                  <h3
                    className={`text-lg font-semibold ${
                      repaymentPrediction.includes("High")
                        ? "text-emerald-800"
                        : repaymentPrediction.includes("Moderate")
                        ? "text-amber-800"
                        : "text-red-800"
                    }`}
                  >
                    {repaymentPrediction}
                  </h3>
                </div>
                <p
                  className={`text-sm ${
                    repaymentPrediction.includes("High")
                      ? "text-emerald-700"
                      : repaymentPrediction.includes("Moderate")
                      ? "text-amber-700"
                      : "text-red-700"
                  }`}
                >
                  {repaymentPrediction.includes("High")
                    ? "Based on analysis of bank statements, this borrower shows excellent financial discipline and stable income patterns."
                    : repaymentPrediction.includes("Moderate")
                    ? "The borrower shows some positive financial patterns but there are minor concerns to monitor."
                    : "Financial patterns indicate potential repayment issues. Additional verification recommended."}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 flex-1">
                <h3 className="text-gray-700 font-medium mb-4">Key Factors</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center mt-0.5 ${
                        dti < 0.5
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span className="text-xs">{dti < 0.5 ? "✓" : "×"}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Debt-to-Income Ratio
                      </p>
                      <p className="text-xs text-gray-500">
                        {dti < 0.5
                          ? "Within acceptable range"
                          : "Above recommended threshold"}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center mt-0.5 ${
                        cashflowTrend === "Positive"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span className="text-xs">
                        {cashflowTrend === "Positive" ? "✓" : "×"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Cash Flow
                      </p>
                      <p className="text-xs text-gray-500">
                        {cashflowTrend === "Positive"
                          ? "Positive trend"
                          : "Negative trend"}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center mt-0.5 ${
                        redFlags.length === 0
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span className="text-xs">
                        {redFlags.length === 0 ? "✓" : "×"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Risk Flags
                      </p>
                      <p className="text-xs text-gray-500">
                        {redFlags.length === 0
                          ? "No issues detected"
                          : `${redFlags.length} issue(s) found`}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Bar data={chartData} options={chartOptions} />
        </section>
      </main>
    </div>
  );
}
