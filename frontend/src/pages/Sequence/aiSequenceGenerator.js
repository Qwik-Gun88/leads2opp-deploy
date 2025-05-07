// src/components/sequence/aiSequenceGenerator.js
export const generateAISequence = async (userIntent) => {
    if (!userIntent) return { nodes: [], edges: [] };
  
    try {
      const res = await fetch('/api/generate-sequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userIntent }),
      });
  
      const data = await res.json();
  
      if (data.nodes && data.edges) {
        console.log('🧠 AI-generated sequence:', data);
        return data;
      } else {
        console.warn('Invalid AI sequence data structure:', data);
        return { nodes: [], edges: [] };
      }
    } catch (err) {
      console.error('❌ Error generating sequence:', err);
      return { nodes: [], edges: [] };
    }
  };
  