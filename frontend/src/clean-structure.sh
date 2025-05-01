#!/bin/bash

echo "📁 Creating folders..."
mkdir -p components/layout
mkdir -p components/modals
mkdir -p components/nodes
mkdir -p pages/Dashboard
mkdir -p pages/Sequence

echo ""
echo "📦 Moving layout files..."
for file in HeaderAppBar.jsx DashboardLayout.jsx SubPageLayout.jsx; do
  if [[ -f $file ]]; then
    mv "$file" components/layout/
    echo "✅ Moved $file to components/layout/"
  else
    echo "❌ $file not found"
  fi
done

echo ""
echo "📦 Moving modals..."
if [[ -f TriggerConditionModal.jsx ]]; then
  mv TriggerConditionModal.jsx components/modals/
  echo "✅ Moved TriggerConditionModal.jsx to components/modals/"
else
  echo "❌ TriggerConditionModal.jsx not found"
fi

echo ""
echo "📦 Moving node components..."
if [[ -f EmailNode.jsx ]]; then
  mv EmailNode.jsx components/nodes/
  echo "✅ Moved EmailNode.jsx to components/nodes/"
else
  echo "❌ EmailNode.jsx not found"
fi

echo ""
echo "📦 Moving Dashboard pages..."
for file in ContactsCentre.jsx ContactsManager.jsx AnalyticsReporting.jsx ContactsCentreBlock.jsx ContactsManagerBlock.jsx AnalyticsReportingBlock.jsx Updates.jsx UpdatesBlock.jsx; do
  if [[ -f $file ]]; then
    mv "$file" pages/Dashboard/
    echo "✅ Moved $file to pages/Dashboard/"
  else
    echo "❌ $file not found"
  fi
done

echo ""
echo "📦 Moving Sequence and Homepage pages..."
if [[ -f DesignSequence.jsx ]]; then
  mv DesignSequence.jsx pages/Sequence/
  echo "✅ Moved DesignSequence.jsx to pages/Sequence/"
else
  echo "❌ DesignSequence.jsx not found"
fi

if [[ -f Homepage.jsx ]]; then
  mv Homepage.jsx pages/
  echo "✅ Moved Homepage.jsx to pages/"
else
  echo "❌ Homepage.jsx not found"
fi

echo ""
echo "🧹 Cleanup complete."
