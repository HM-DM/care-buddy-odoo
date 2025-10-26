import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { mockBabies } from '@/lib/mockData';
import { Plus, Trash2, Save } from 'lucide-react';
import { format } from 'date-fns';

interface MealForm {
  id: string;
  time: string;
  type: string;
  description: string;
  amount: string;
  finished: boolean;
}

interface NapForm {
  id: string;
  startTime: string;
  endTime: string;
}

interface ActivityForm {
  id: string;
  time: string;
  type: string;
  description: string;
}

export default function AddLogEntry() {
  const { toast } = useToast();
  const [selectedBaby, setSelectedBaby] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [meals, setMeals] = useState<MealForm[]>([
    { id: '1', time: '', type: 'bottle', description: '', amount: '', finished: false }
  ]);
  const [naps, setNaps] = useState<NapForm[]>([
    { id: '1', startTime: '', endTime: '' }
  ]);
  const [activities, setActivities] = useState<ActivityForm[]>([
    { id: '1', time: '', type: 'play', description: '' }
  ]);
  const [diaperChanges, setDiaperChanges] = useState('0');
  const [mood, setMood] = useState('happy');
  const [notes, setNotes] = useState('');

  const addMeal = () => {
    setMeals([...meals, { 
      id: Date.now().toString(), 
      time: '', 
      type: 'bottle', 
      description: '', 
      amount: '', 
      finished: false 
    }]);
  };

  const removeMeal = (id: string) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  const updateMeal = (id: string, field: keyof MealForm, value: any) => {
    setMeals(meals.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addNap = () => {
    setNaps([...naps, { id: Date.now().toString(), startTime: '', endTime: '' }]);
  };

  const removeNap = (id: string) => {
    setNaps(naps.filter(n => n.id !== id));
  };

  const updateNap = (id: string, field: keyof NapForm, value: string) => {
    setNaps(naps.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  const addActivity = () => {
    setActivities([...activities, { id: Date.now().toString(), time: '', type: 'play', description: '' }]);
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const updateActivity = (id: string, field: keyof ActivityForm, value: string) => {
    setActivities(activities.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBaby) {
      toast({
        title: "Error",
        description: "Please select a baby",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to a database
    toast({
      title: "Success",
      description: "Daily log entry saved successfully!"
    });

    // Reset form
    setMeals([{ id: '1', time: '', type: 'bottle', description: '', amount: '', finished: false }]);
    setNaps([{ id: '1', startTime: '', endTime: '' }]);
    setActivities([{ id: '1', time: '', type: 'play', description: '' }]);
    setDiaperChanges('0');
    setMood('happy');
    setNotes('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 lg:pb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add Daily Log Entry</h1>
          <p className="text-muted-foreground">Record meals, naps, activities, and notes for a baby</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Baby Selection and Date */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Select the baby and date for this log entry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="baby">Baby *</Label>
                  <Select value={selectedBaby} onValueChange={setSelectedBaby}>
                    <SelectTrigger id="baby">
                      <SelectValue placeholder="Select a baby" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBabies.map(baby => (
                        <SelectItem key={baby.id} value={baby.id}>
                          {baby.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meals & Feeding</CardTitle>
                  <CardDescription>Record all meals and feeding times</CardDescription>
                </div>
                <Button type="button" onClick={addMeal} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Meal
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {meals.map((meal, index) => (
                <div key={meal.id} className="space-y-4 rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Meal {index + 1}</h4>
                    {meals.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeMeal(meal.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input 
                        type="time" 
                        value={meal.time}
                        onChange={(e) => updateMeal(meal.id, 'time', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={meal.type} onValueChange={(val) => updateMeal(meal.id, 'type', val)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottle">Bottle</SelectItem>
                          <SelectItem value="breast">Breast</SelectItem>
                          <SelectItem value="solid">Solid Food</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input 
                        placeholder="e.g., Formula, mashed carrots"
                        value={meal.description}
                        onChange={(e) => updateMeal(meal.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input 
                        placeholder="e.g., 6 oz, 1/2 cup"
                        value={meal.amount}
                        onChange={(e) => updateMeal(meal.id, 'amount', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`finished-${meal.id}`}
                      checked={meal.finished}
                      onCheckedChange={(checked) => updateMeal(meal.id, 'finished', checked)}
                    />
                    <Label htmlFor={`finished-${meal.id}`} className="cursor-pointer">
                      Finished completely
                    </Label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Naps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Nap Times</CardTitle>
                  <CardDescription>Track sleep and nap duration</CardDescription>
                </div>
                <Button type="button" onClick={addNap} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Nap
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {naps.map((nap, index) => (
                <div key={nap.id} className="space-y-4 rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Nap {index + 1}</h4>
                    {naps.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeNap(nap.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input 
                        type="time" 
                        value={nap.startTime}
                        onChange={(e) => updateNap(nap.id, 'startTime', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input 
                        type="time" 
                        value={nap.endTime}
                        onChange={(e) => updateNap(nap.id, 'endTime', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>Log play time and learning activities</CardDescription>
                </div>
                <Button type="button" onClick={addActivity} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="space-y-4 rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Activity {index + 1}</h4>
                    {activities.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeActivity(activity.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input 
                        type="time" 
                        value={activity.time}
                        onChange={(e) => updateActivity(activity.id, 'time', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={activity.type} onValueChange={(val) => updateActivity(activity.id, 'type', val)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="play">Play</SelectItem>
                          <SelectItem value="outdoor">Outdoor</SelectItem>
                          <SelectItem value="learning">Learning</SelectItem>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Describe the activity..."
                      value={activity.description}
                      onChange={(e) => updateActivity(activity.id, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Diaper Changes and Mood */}
          <Card>
            <CardHeader>
              <CardTitle>Health & Mood</CardTitle>
              <CardDescription>Track diaper changes and overall mood</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="diaper">Number of Diaper Changes</Label>
                  <Input 
                    id="diaper"
                    type="number" 
                    min="0"
                    value={diaperChanges}
                    onChange={(e) => setDiaperChanges(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mood">Overall Mood</Label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger id="mood">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">😊 Happy</SelectItem>
                      <SelectItem value="calm">😌 Calm</SelectItem>
                      <SelectItem value="sleepy">😴 Sleepy</SelectItem>
                      <SelectItem value="fussy">😢 Fussy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Notes</CardTitle>
              <CardDescription>Add any additional observations or important information</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Any special observations, incidents, or notes for the parents..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Log Entry
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}